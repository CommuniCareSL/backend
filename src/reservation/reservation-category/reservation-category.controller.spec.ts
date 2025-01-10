import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCategoryController } from './reservation-category.controller';

describe('ReservationCategoryController', () => {
  let controller: ReservationCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationCategoryController],
    }).compile();

    controller = module.get<ReservationCategoryController>(ReservationCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
