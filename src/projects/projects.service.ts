import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createProjectDto: CreateProjectDto,
    thumbnailPath: string,
    gifPath: string,
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
}
