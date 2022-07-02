import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const tag = await this.tagService.findOne(id);

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    const tagExists = await this.tagService.verifyExists(id);

    if (!tagExists) {
      throw new NotFoundException('Tag dos not exists');
    }

    try {
      return this.tagService.update(id, updateTagDto);
    } catch (error) {
      throw new BadRequestException('Cannot update tag');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const tagExists = await this.tagService.verifyExists(id);

    if (!tagExists) {
      throw new NotFoundException('Tag dos not exists');
    }

    try {
      await this.tagService.remove(id);

      return { message: 'success' };
    } catch (error) {
      throw new BadRequestException('Cannot delete tag');
    }
  }
}
