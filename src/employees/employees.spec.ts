import { Test, TestingModule } from '@nestjs/testing';
import { Employees } from './employees';

describe('Employees', () => {
  let provider: Employees;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Employees],
    }).compile();

    provider = module.get<Employees>(Employees);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
