import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { ProjectNotFoundException } from 'src/exceptions/ProjectNotFound.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { ProjectsService } from './projects.service';

// @ApiBearerAuth()
@ApiTags('Projects')
@Controller('projects')
// @UseGuards(AuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private awsS3Service: AwsS3Service,
    private prismaService: PrismaService,
  ) {}

  @Get('visible')
  async getAllVisiblesProjects() {
    return this.projectsService.listAllVisibleProjects()
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        name: createProjectDto.name,
      },
    });

    if (projectsAlreadyExits) {
      throw new BadRequestException('Project already exists');
    }

    try {
      return await this.projectsService.create(createProjectDto);
    } catch (error) {
      console.log(error);

      throw new BadRequestException('Erro ao criar o projeto');
    }
  }

  @Get()
  async getAllProjects() {
    return await this.projectsService.listAll();
  }

  @Get(':id')
  async getProjectByID(@Param('id') id: string) {
    const project = await this.projectsService.geyById(Number(id));

    if (!project) {
      throw new ProjectNotFoundException();
    }

    return project;
  }

  

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDTO: UpdateProjectDto,
  ) {
    const projectId = Number(id);

    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        id: Number(projectId),
      },
    });

    if (!projectsAlreadyExits) {
      throw new ProjectNotFoundException();
    }

    try {
      if (updateProjectDTO.hidden) {
        updateProjectDTO.hidden =
          String(updateProjectDTO.hidden) === 'true' ? true : false;
      }

      await this.projectsService.update(updateProjectDTO, projectId);

      return { message: 'success' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    const projectId = Number(id);

    const projectsAlreadyExits = await this.prismaService.project.findFirst({
      where: {
        id: Number(projectId),
      },
    });

    if (!projectsAlreadyExits) {
      throw new ProjectNotFoundException();
    }

    try {
      const gifFilename = projectsAlreadyExits.gifPath.split('/')[3];
      const thumbnailFileName =
        projectsAlreadyExits.thumbnailPath.split('/')[3];

      await this.awsS3Service.removeFile(gifFilename);
      await this.awsS3Service.removeFile(thumbnailFileName);

      await this.prismaService.project.delete({
        where: {
          id: projectId,
        },
      });

      return {
        message: 'project deleted',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
