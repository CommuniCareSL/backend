import { Test, TestingModule } from '@nestjs/testing';
import { GroundController } from './ground.controller';

describe('GroundController', () => {
  let controller: GroundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroundController],
    }).compile();

    controller = module.get<GroundController>(GroundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
