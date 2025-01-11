import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCategoryService } from './reservation-category.service';

describe('ReservationCategoryService', () => {
  let service: ReservationCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCategoryService],
    }).compile();

    service = module.get<ReservationCategoryService>(ReservationCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
