import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id : number
    @Column ()
    name: string
    @Column()
    author : string
    @Column()
    description : string 
    @ManyToOne(() => Category, (category) => category.books)
    category: Category;
    @Column()
    image: string;
}