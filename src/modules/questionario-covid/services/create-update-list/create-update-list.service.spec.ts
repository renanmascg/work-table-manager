import { Test, TestingModule } from '@nestjs/testing';
import { CreateUpdateListService } from './create-update-list.service';

describe('CreateUpdateListService', () => {
  let service: CreateUpdateListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUpdateListService],
    }).compile();

    service = module.get<CreateUpdateListService>(CreateUpdateListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
