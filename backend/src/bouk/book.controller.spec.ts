import { Test, TestingModule } from '@nestjs/testing';
import { bookController } from './book.controller';
import { bookService } from './book.service';

describe('bookController', () => {
  let controller: bookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [bookController],
      providers: [bookService],
    }).compile();

    controller = module.get<bookController>(bookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
