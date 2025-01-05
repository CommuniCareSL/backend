import { Test, TestingModule } from '@nestjs/testing';
import { Sabha } from './sabha';

describe('Sabha', () => {
  let provider: Sabha;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Sabha],
    }).compile();

    provider = module.get<Sabha>(Sabha);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
