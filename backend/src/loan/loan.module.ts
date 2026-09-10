import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/bouk/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, User, Book])],
  controllers: [LoanController],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
