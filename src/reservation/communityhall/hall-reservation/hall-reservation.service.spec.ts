import { Test, TestingModule } from '@nestjs/testing';
import { HallReservationService } from './hall-reservation.service';

describe('HallReservationService', () => {
  let service: HallReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HallReservationService],
    }).compile();

    service = module.get<HallReservationService>(HallReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
