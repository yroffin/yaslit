import { Test, TestingModule } from '@nestjs/testing';
import { SomethingController } from './something.controller';

describe('Something Controller', () => {
  let controller: SomethingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SomethingController],
    }).compile();

    controller = module.get<SomethingController>(SomethingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
