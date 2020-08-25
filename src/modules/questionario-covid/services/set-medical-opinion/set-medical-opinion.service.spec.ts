import { Test, TestingModule } from '@nestjs/testing';
import { SetMedicalOpinionService } from './set-medical-opinion.service';

describe('SetMedicalOpinionService', () => {
  let service: SetMedicalOpinionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetMedicalOpinionService],
    }).compile();

    service = module.get<SetMedicalOpinionService>(SetMedicalOpinionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
