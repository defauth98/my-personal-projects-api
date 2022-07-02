import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsHasTagsService } from './projects_has_tags.service';
import { CreateProjectsHasTagDto } from './dto/create-projects_has_tag.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { TagService } from 'src/tag/tag.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects Tag')
@Controller('project/:projectId/tag')
export class ProjectsHasTagsController {
  constructor(
    private readonly projectsHasTagsService: ProjectsHasTagsService,
    private readonly projectsService: ProjectsService,
    private readonly tagService: TagService,
  ) {}

  @Post()
  async create(
    @Param('projectId', ParseIntPipe) project_id: number,
    @Body() createProjectsHasTagDto: CreateProjectsHasTagDto,
  ) {
    const projectExists = await this.projectsService.verifyExists(project_id);

    if (!projectExists) {
      throw new NotFoundException('Project not found');
    }

    const tagExists = await this.tagService.verifyExists(
      createProjectsHasTagDto.tag_id,
    );

    if (!tagExists) {
      throw new BadRequestException('Tag not found');
    }

    const verifyAlreadyExists = await this.projectsHasTagsService.verifyExists(
      project_id,
      createProjectsHasTagDto.tag_id,
    );

    if (verifyAlreadyExists) {
      throw new BadRequestException('Project already have this tag');
    }

    createProjectsHasTagDto.project_id = project_id;

    return this.projectsHasTagsService.create(createProjectsHasTagDto);
  }

  @Delete(':id')
  remove(
    @Param('projectId', ParseIntPipe) project_id: number,
    @Param('id', ParseIntPipe) tag_id: number,
  ) {
    return this.projectsHasTagsService.remove(project_id, tag_id);
  }
}
