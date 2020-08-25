import { Test, TestingModule } from '@nestjs/testing';
import { QuestionarioCovidController } from './questionario-covid.controller';

describe('QuestionarioCovid Controller', () => {
  let controller: QuestionarioCovidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionarioCovidController],
    }).compile();

    controller = module.get<QuestionarioCovidController>(QuestionarioCovidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
