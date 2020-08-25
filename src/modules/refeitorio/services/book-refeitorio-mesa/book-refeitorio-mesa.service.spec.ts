import { Test, TestingModule } from '@nestjs/testing';
import { BookRefeitorioMesaService } from './book-refeitorio-mesa.service';

describe('BookRefeitorioMesaService', () => {
  let service: BookRefeitorioMesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookRefeitorioMesaService],
    }).compile();

    service = module.get<BookRefeitorioMesaService>(BookRefeitorioMesaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
