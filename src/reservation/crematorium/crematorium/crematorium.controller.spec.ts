import { Test, TestingModule } from '@nestjs/testing';
import { CrematoriumController } from './crematorium.controller';

describe('CrematoriumController', () => {
  let controller: CrematoriumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrematoriumController],
    }).compile();

    controller = module.get<CrematoriumController>(CrematoriumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
