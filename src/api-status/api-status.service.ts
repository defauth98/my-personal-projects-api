import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApiStatusDto } from './dto/create-api-status.dto';
import { UpdateApiStatusDto } from './dto/update-api-status.dto';

@Injectable()
export class ApiStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createApiStatusDto: CreateApiStatusDto) {
    return this.prismaService.apiStatus.create({ data: createApiStatusDto });
  }

  findAll() {
    return this.prismaService.apiStatus.findMany();
  }

  update(id: number, updateApiStatusDto: UpdateApiStatusDto) {
    return this.prismaService.apiStatus.update({
      where: { id },
      data: updateApiStatusDto,
    });
  }

  remove(id: number) {
    return this.prismaService.apiStatus.delete({ where: { id } });
  }
}
