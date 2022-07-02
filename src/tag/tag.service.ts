import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private db: PrismaService) {}

  async create(data: CreateTagDto) {
    return this.db.tag.create({
      data,
    });
  }

  async findAll() {
    return this.db.tag.findMany();
  }

  async findOne(id: number) {
    return await this.db.tag.findUnique({
      where: {
        id,
      },
    });
  }

  async verifyExists(id: number) {
    const tagExists = await this.db.tag.findUnique({ where: { id } });

    if (!tagExists) {
      return false;
    }

    return true;
  }

  async update(tagId: number, data: UpdateTagDto) {
    return this.db.tag.update({
      data,
      where: {
        id: tagId,
      },
    });
  }

  async remove(tagId: number) {
    return this.db.tag.delete({ where: { id: tagId } });
  }
}
