import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsHasTagsService } from './projects_has_tags.service';

describe('ProjectsHasTagsService', () => {
  let service: ProjectsHasTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsHasTagsService],
    }).compile();

    service = module.get<ProjectsHasTagsService>(ProjectsHasTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
