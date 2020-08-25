import { Test, TestingModule } from '@nestjs/testing';
import { BookingMesaController } from './booking-mesa.controller';

describe('BookingMesa Controller', () => {
  let controller: BookingMesaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingMesaController],
    }).compile();

    controller = module.get<BookingMesaController>(BookingMesaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
