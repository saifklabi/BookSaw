import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() body: { userId: number; bookId: number; durationDays: number }) {
    return this.loanService.createLoan(body.userId, body.bookId, body.durationDays);
  }

  @Get()
  findAll() {
    return this.loanService.findAllLoans();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.loanService.findLoansByUser(+userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: 'accepted' | 'rejected' }) {
    return this.loanService.updateLoanStatus(+id, body.status);
  }
}
