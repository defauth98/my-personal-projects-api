import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsHasTagsController } from './projects_has_tags.controller';
import { ProjectsHasTagsService } from './projects_has_tags.service';

describe('ProjectsHasTagsController', () => {
  let controller: ProjectsHasTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsHasTagsController],
      providers: [ProjectsHasTagsService],
    }).compile();

    controller = module.get<ProjectsHasTagsController>(
      ProjectsHasTagsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
