import { Test, TestingModule } from '@nestjs/testing';
import { CrematoriumService } from './crematorium.service';

describe('CrematoriumService', () => {
  let service: CrematoriumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrematoriumService],
    }).compile();

    service = module.get<CrematoriumService>(CrematoriumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
