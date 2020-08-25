import { Test, TestingModule } from '@nestjs/testing';
import { GetUserHealthDataService } from './get-user-health-data.service';

describe('GetUserHealthDataService', () => {
  let service: GetUserHealthDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserHealthDataService],
    }).compile();

    service = module.get<GetUserHealthDataService>(GetUserHealthDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
