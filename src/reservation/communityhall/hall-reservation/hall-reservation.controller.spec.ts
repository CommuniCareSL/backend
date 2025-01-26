import { Test, TestingModule } from '@nestjs/testing';
import { HallReservationController } from './hall-reservation.controller';

describe('HallReservationController', () => {
  let controller: HallReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallReservationController],
    }).compile();

    controller = module.get<HallReservationController>(HallReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
