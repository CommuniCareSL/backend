import { Test, TestingModule } from '@nestjs/testing';
import { SabhaController } from './sabha.controller';

describe('SabhaController', () => {
  let controller: SabhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SabhaController],
    }).compile();

    controller = module.get<SabhaController>(SabhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
