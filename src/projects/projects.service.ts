import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project-dto';

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
    const projects = await this.prismaService.project.findMany({
      include: {
        ProjectHasTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return projects;
  }

  async listAllVisibleProjects() {
    const projects = await this.prismaService.project.findMany({
      where: {
        hidden: false,
      },
      include: {
        ProjectHasTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return projects;
  }

  async verifyExists(id: number) {
    const projectExists = await this.prismaService.project.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!projectExists) {
      return false;
    }

    return true;
  }

  async geyById(id: number) {
    return await this.prismaService.project.findFirst({
      where: {
        id,
      },
      include: {
        ProjectHasTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async update(UpdateProjectDto: UpdateProjectDto, projectId: number) {
    const project = await this.prismaService.project.update({
      data: UpdateProjectDto,
      where: {
        id: projectId,
      },
    });

    return project;
  }
}
