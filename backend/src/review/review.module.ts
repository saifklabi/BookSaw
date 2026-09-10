import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/bouk/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Book])],
  providers: [ReviewService],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
