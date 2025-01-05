import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintCategoryService } from './complaint-category.service';

describe('ComplaintCategoryService', () => {
  let service: ComplaintCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplaintCategoryService],
    }).compile();

    service = module.get<ComplaintCategoryService>(ComplaintCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
