import { Test, TestingModule } from '@nestjs/testing';
import { GroundReservationController } from './ground-reservation.controller';

describe('GroundReservationController', () => {
  let controller: GroundReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroundReservationController],
    }).compile();

    controller = module.get<GroundReservationController>(GroundReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
