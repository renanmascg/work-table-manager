import { Test, TestingModule } from '@nestjs/testing';
import { MedicalOpinionController } from './medical-opinion.controller';

describe('MedicalOpinion Controller', () => {
  let controller: MedicalOpinionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalOpinionController],
    }).compile();

    controller = module.get<MedicalOpinionController>(MedicalOpinionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
