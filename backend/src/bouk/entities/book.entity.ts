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
    @Column({ type: 'float', default: 0 })
    rating: number;
    @Column({ type: 'text', nullable: true })
    comment: string;
    @ManyToOne(() => Category, (category) => category.books)
    category: Category;
    @Column()
    image: string;

}