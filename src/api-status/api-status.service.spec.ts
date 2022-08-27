import { Test, TestingModule } from '@nestjs/testing';
import { ApiStatusService } from './api-status.service';

describe('ApiStatusService', () => {
  let service: ApiStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiStatusService],
    }).compile();

    service = module.get<ApiStatusService>(ApiStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
