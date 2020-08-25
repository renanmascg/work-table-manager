import { Test, TestingModule } from '@nestjs/testing';
import { InitializeUserService } from './initialize-user.service';

describe('InitializeUserService', () => {
  let service: InitializeUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitializeUserService],
    }).compile();

    service = module.get<InitializeUserService>(InitializeUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
