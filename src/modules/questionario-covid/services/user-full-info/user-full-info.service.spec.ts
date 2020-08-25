import { Test, TestingModule } from '@nestjs/testing';
import { UserFullInfoService } from './user-full-info.service';

describe('UserFullInfoService', () => {
  let service: UserFullInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFullInfoService],
    }).compile();

    service = module.get<UserFullInfoService>(UserFullInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
