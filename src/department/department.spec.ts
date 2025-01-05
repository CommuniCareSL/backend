import { Test, TestingModule } from '@nestjs/testing';
import { Department } from './department';

describe('Department', () => {
  let provider: Department;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Department],
    }).compile();

    provider = module.get<Department>(Department);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
