import { Test, TestingModule } from '@nestjs/testing';
import { RefeitorioController } from './refeitorio.controller';

describe('Refeitorio Controller', () => {
  let controller: RefeitorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefeitorioController],
    }).compile();

    controller = module.get<RefeitorioController>(RefeitorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
