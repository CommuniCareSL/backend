import { Test, TestingModule } from '@nestjs/testing';
import { SabhaService } from './sabha.service';

describe('SabhaService', () => {
  let service: SabhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabhaService],
    }).compile();

    service = module.get<SabhaService>(SabhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
