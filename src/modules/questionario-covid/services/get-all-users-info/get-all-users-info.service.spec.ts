import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUsersInfoService } from './get-all-users-info.service';

describe('GetAllUsersInfoService', () => {
  let service: GetAllUsersInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllUsersInfoService],
    }).compile();

    service = module.get<GetAllUsersInfoService>(GetAllUsersInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
