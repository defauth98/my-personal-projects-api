import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsService } from '../projects/projects.service';
import { TagService } from '../tag/tag.service';
import { ProjectsHasTagsController } from './projects_has_tags.controller';
import { ProjectsHasTagsService } from './projects_has_tags.service';

describe('ProjectsHasTagsController', () => {
  let controller: ProjectsHasTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProjectsHasTagsController],
      providers: [ProjectsHasTagsService, ProjectsService, TagService],
    }).compile();

    controller = module.get<ProjectsHasTagsController>(
      ProjectsHasTagsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
