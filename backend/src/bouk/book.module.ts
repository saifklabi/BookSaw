import { Module } from '@nestjs/common';

import { bookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { bookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],

  controllers: [bookController],
  providers: [bookService],
})
export class bookModule {}
