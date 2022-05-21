import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDTO } from './dto/update-project-dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createProjectDto: CreateProjectDto,
    thumbnailPath?: string,
    gifPath?: string,
  ) {
    const project = await this.prismaService.project.create({
      data: {
        ...createProjectDto,
        thumbnailPath,
        gifPath,
      },
    });

    return project;
  }

  async listAll() {
    const projects = await this.prismaService.project.findMany();

    return projects;
  }

  async listAllVisibleProjects() {
    const projects = await this.prismaService.project.findMany({
      where: {
        hidden: false,
      },
    });

    return projects;
  }

  async update(updateProjectDTO: UpdateProjectDTO, projectId: number) {
    const project = await this.prismaService.project.update({
      data: updateProjectDTO,
      where: {
        id: projectId,
      },
    });

    return project;
  }
}
