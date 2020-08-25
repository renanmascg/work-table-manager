import { Test, TestingModule } from '@nestjs/testing';
import { SaveUserAnswerService } from './save-user-answer.service';

describe('SaveUserAnswerService', () => {
  let service: SaveUserAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveUserAnswerService],
    }).compile();

    service = module.get<SaveUserAnswerService>(SaveUserAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
