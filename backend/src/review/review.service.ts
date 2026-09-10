import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/bouk/entities/book.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async createReview(userId: number, bookId: number, rating?: number, comment?: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    const review = this.reviewRepository.create({ user, book, rating, comment });
    return await this.reviewRepository.save(review);
  }

  async findByBook(bookId: number) {
    return await this.reviewRepository.find({ where: { book: { id: bookId } }, relations: { user: true }, order: { createdAt: 'DESC' } });
  }
}
