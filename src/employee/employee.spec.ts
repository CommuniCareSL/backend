import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from './employee';

describe('Employee', () => {
  let provider: Employee;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Employee],
    }).compile();

    provider = module.get<Employee>(Employee);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
