import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCategory } from './reservation-category';

describe('ReservationCategory', () => {
  let provider: ReservationCategory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCategory],
    }).compile();

    provider = module.get<ReservationCategory>(ReservationCategory);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
