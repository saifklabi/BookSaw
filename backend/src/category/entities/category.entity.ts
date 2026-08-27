
import { Book } from "src/bouk/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()


export class Category {
    @PrimaryGeneratedColumn()
    id:number;
  @Column()
  name: string;

  //relqtion  category to book
@OneToMany(() => Book, (book) => book.category)
books: Book[];
}
