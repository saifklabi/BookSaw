import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Book } from "src/bouk/entities/book.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @Column({ type: "enum", enum: ["admin", "librarian", "client"], default: "client" })
   role: string;

  @ManyToMany(() => Book, (book) => book.users)
  @JoinTable({ name: "user_books" })
  books: Book[];
}


