import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/bouk/entities/book.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loans, { nullable: false })
  user: User;

  @ManyToOne(() => Book, (book) => book.loans, { nullable: false })
  book: Book;

  @Column({ type: 'int' })
  durationDays: number;

  @CreateDateColumn()
  createdAt: Date;
  
  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string; // 'pending' | 'accepted' | 'rejected'
}
