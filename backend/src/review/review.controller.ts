import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() body: { userId: number; bookId: number; rating?: number; comment?: string }) {
    return this.reviewService.createReview(body.userId, body.bookId, body.rating, body.comment);
  }

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.reviewService.findByBook(+bookId);
  }
}
