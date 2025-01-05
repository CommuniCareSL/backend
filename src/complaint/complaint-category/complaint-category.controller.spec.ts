import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintCategoryController } from './complaint-category.controller';

describe('ComplaintCategoryController', () => {
  let controller: ComplaintCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintCategoryController],
    }).compile();

    controller = module.get<ComplaintCategoryController>(ComplaintCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
