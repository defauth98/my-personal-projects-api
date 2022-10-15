import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectsHasTagDto } from './dto/create-projects_has_tag.dto';

@Injectable()
export class ProjectsHasTagsService {
  constructor(private db: PrismaService) {}

  async create(data: CreateProjectsHasTagDto) {
    return this.db.projectHasTags.create({
      data,
    });
  }

  async findAll() {
    return this.db.projectHasTags.findMany();
  }

  async findOne(id: number) {
    return await this.db.projectHasTags.findUnique({
      where: {
        id,
      },
    });
  }

  async verifyExists(project_id: number, tag_id: number) {
    const tagExists = await this.db.projectHasTags.findFirst({
      where: { project_id, tag_id },
    });

    if (!tagExists) {
      return false;
    }

    return true;
  }

  async remove(project_id: number, tag_id: number) {
    return this.db.projectHasTags.deleteMany({ where: { project_id, tag_id } });
  }
}
