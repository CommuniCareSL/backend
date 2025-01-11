import { Test, TestingModule } from '@nestjs/testing';
import { GroundReservationService } from './ground-reservation.service';

describe('GroundReservationService', () => {
  let service: GroundReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroundReservationService],
    }).compile();

    service = module.get<GroundReservationService>(GroundReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
