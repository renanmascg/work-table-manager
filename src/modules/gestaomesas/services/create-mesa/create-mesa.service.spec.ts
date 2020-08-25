import { Test, TestingModule } from '@nestjs/testing';
import { CreateMesaService } from './create-mesa.service';

describe('CreateMesaService', () => {
  let service: CreateMesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateMesaService],
    }).compile();

    service = module.get<CreateMesaService>(CreateMesaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
