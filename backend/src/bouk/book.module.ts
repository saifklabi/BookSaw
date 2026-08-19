import { Module } from '@nestjs/common';

import { bookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { bookService } from './book.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]),
TypeOrmModule.forFeature([Category])],

  controllers: [bookController],
  providers: [bookService],
})
export class bookModule {}
