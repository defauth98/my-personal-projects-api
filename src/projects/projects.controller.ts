import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDTO } from './dto/update-project-dto';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private awsS3Service: AwsS3Service,
    private prismaService: PrismaService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'gif', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      gif?: Express.Multer.File[];
    },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        name: createProjectDto.name,
      },
    });

    if (projectsAlreadyExits) {
      return {
        message: 'this project already exits',
      };
    }

    if (process.env.NODE_ENV !== 'develop') {
      if (!files.gif || !files.thumbnail) {
        return {
          message: 'You must provide the thumbnail and gif',
        };
      }

      await this.awsS3Service.uploadFile(
        files.thumbnail[0].buffer,
        files.thumbnail[0].originalname,
      );

      await this.awsS3Service.uploadFile(
        files.gif[0].buffer,
        files.gif[0].originalname,
      );

      const thumbnailLink = `https://d1hx83ee0ymv6l.cloudfront.net/${files.thumbnail[0].originalname}`;
      const gifLink = `https://d1hx83ee0ymv6l.cloudfront.net/${files.gif[0].originalname}`;

      return await this.projectsService.create(
        createProjectDto,
        thumbnailLink,
        gifLink,
      );
    }

    return await this.projectsService.create(
      createProjectDto,
      'https://defauth98.github.io.',
      'https://defauth98.github.io./',
    );
  }

  @Get()
  async getAllProjects() {
    return await this.projectsService.listAll();
  }

  @Get(':id')
  async getProjectByID(@Param('id') id: string) {
    return await this.projectsService.geyById(Number(id));
  }

  @Get('/visible')
  async getAllVisiblesProjects() {
    return await this.projectsService.listAllVisibleProjects();
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'gif', maxCount: 1 },
    ]),
  )
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDTO,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      gif?: Express.Multer.File[];
    },
  ) {
    const projectId = Number(id);

    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        id: Number(projectId),
      },
    });

    if (!projectsAlreadyExits) {
      return {
        message: 'this project does not exist',
      };
    }

    const gifFilename = projectsAlreadyExits.gifPath.split('/')[3];
    if (files.gif && files.gif[0].originalname !== gifFilename) {
      if (gifFilename && gifFilename.length)
        await this.awsS3Service.removeFile(gifFilename);

      await this.awsS3Service.uploadFile(
        files.gif[0].buffer,
        files.gif[0].originalname,
      );
      updateProjectDTO.gifPath = `https://d1hx83ee0ymv6l.cldoudfront.net/${files.gif[0].originalname}`;
    }

    const thumbnailFileName = projectsAlreadyExits.thumbnailPath.split('/')[3];
    if (
      files.thumbnail &&
      files.thumbnail[0].originalname !== thumbnailFileName
    ) {
      if (thumbnailFileName && thumbnailFileName.length)
        await this.awsS3Service.removeFile(thumbnailFileName);
      await this.awsS3Service.uploadFile(
        files.thumbnail[0].buffer,
        files.thumbnail[0].originalname,
      );
      updateProjectDTO.thumbnailPath = `https://d1hx83ee0ymv6l.cloudfront.net/${files.thumbnail[0].originalname}`;
    }

    if (updateProjectDTO.hidden) {
      updateProjectDTO.hidden =
        String(updateProjectDTO.hidden) === 'true' ? true : false;
    }

    return this.projectsService.update(updateProjectDTO, projectId);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    const projectId = Number(id);

    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        id: Number(projectId),
      },
    });

    if (process.env.NODE_ENV !== 'develop') {
      const gifFilename = projectsAlreadyExits.gifPath.split('/')[3];
      const thumbnailFileName =
        projectsAlreadyExits.thumbnailPath.split('/')[3];

      await this.awsS3Service.removeFile(gifFilename);
      await this.awsS3Service.removeFile(thumbnailFileName);
    }

    await this.prismaService.project.delete({
      where: {
        id: projectId,
      },
    });

    return {
      message: 'project deleted',
    };
  }
}
