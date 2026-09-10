import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/bouk/entities/book.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async createLoan(userId: number, bookId: number, durationDays: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');

    if (!durationDays || durationDays <= 0) throw new BadRequestException('Invalid duration');

    const loan = this.loanRepository.create({ user, book, durationDays, status: 'pending' });
    return await this.loanRepository.save(loan);
  }

  async findLoansByUser(userId: number) {
    return await this.loanRepository.find({ where: { user: { id: userId } }, relations: { book: true } });
  }

  async findAllLoans() {
    return await this.loanRepository.find({ relations: { book: true, user: true }, order: { createdAt: 'DESC' } });
  }

  async updateLoanStatus(loanId: number, status: 'accepted' | 'rejected') {
    const loan = await this.loanRepository.findOne({ where: { id: loanId }, relations: { user: true, book: true } });
    if (!loan) throw new NotFoundException('Loan not found');
    if (!['accepted', 'rejected'].includes(status)) throw new BadRequestException('Invalid status');
    loan.status = status;
    const saved = await this.loanRepository.save(loan);
    // if accepted, ensure book is added to user's books relation
    if (status === 'accepted') {
      const user = await this.userRepository.findOne({ where: { id: loan.user.id }, relations: { books: true } });
      if (user) {
        const already = user.books.some((b) => b.id === loan.book.id);
        if (!already) {
          user.books.push(loan.book);
          await this.userRepository.save(user);
        }
      }
    }
    return saved;
  }
}
