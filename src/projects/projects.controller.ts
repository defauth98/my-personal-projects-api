import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
  Patch,
  Param,
  Put,
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
    console.log('caiu aq');

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

  @Get()
  async getAllProjects() {
    return await this.projectsService.listAll();
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
      await this.awsS3Service.removeFile(gifFilename);
      await this.awsS3Service.uploadFile(
        files.gif[0].buffer,
        files.gif[0].originalname,
      );
      updateProjectDTO.gifPath = `https://d1hx83ee0ymv6l.cloudfront.net/${files.gif[0].originalname}`;
    }

    const thumbnailFileName = projectsAlreadyExits.thumbnailPath.split('/')[3];
    if (
      files.thumbnail &&
      files.thumbnail[0].originalname !== thumbnailFileName
    ) {
      await this.awsS3Service.removeFile(thumbnailFileName);
      await this.awsS3Service.uploadFile(
        files.thumbnail[0].buffer,
        files.thumbnail[0].originalname,
      );
      updateProjectDTO.thumbnailPath = `https://d1hx83ee0ymv6l.cloudfront.net/${files.thumbnail[0].originalname}`;
    }

    return this.projectsService.update(updateProjectDTO, projectId);
  }
}
