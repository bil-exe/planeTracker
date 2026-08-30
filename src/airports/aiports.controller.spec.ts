import { Test, TestingModule } from '@nestjs/testing';
import { AiportsController } from './aiports.controller';

describe('AiportsController', () => {
  let controller: AiportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiportsController],
    }).compile();

    controller = module.get<AiportsController>(AiportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
