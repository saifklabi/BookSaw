import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Createbookdto } from './dto/create-book.dto';
import { Updatebookdto } from './dto/update-book.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class bookService {
    constructor(@InjectRepository(Book) private bookrepository: Repository<Book>,
        @InjectRepository(Category) private categoryrepository: Repository<Category>) { }
    async addbook(createbookdto: Createbookdto) {

        const newbook = this.bookrepository.create({
            name: createbookdto.name,
            author: createbookdto.author,
            description: createbookdto.description,
            image: createbookdto.image,
            rating: createbookdto.rating ?? 0,
            comment: createbookdto.comment ?? ''
        });
        // Ajouter la relation avec Category
        if (createbookdto.category) {

            const category = await this.categoryrepository.findOne({
                where: {
                    id: createbookdto.category
                }
            });

            if (!category) {
                throw new Error('Category not found');
            }

            newbook.category = category;
        }

        return await this.bookrepository.save(newbook);
    }
    findAll() {
        return this.bookrepository.find({ relations: { category: true } })
    }
    async findOne(id: number) {
        return await this.bookrepository.findOne({ where: { id }, relations: { category: true } })
    }
    async remove(id: number) {
        const bookid = await this.bookrepository.findBy({ id })
        if (!bookid) {
            throw new Error('book not found')
        }
        await this.bookrepository.remove(bookid)
        return "book deleted successfully"


    }
    async update(id: number, updatebookdto: Updatebookdto) {

        const booktoupdate = await this.bookrepository.preload({
            id,
            name: updatebookdto.name,
            author: updatebookdto.author,
            description: updatebookdto.description,
            image: updatebookdto.image || undefined,
            rating: updatebookdto.rating ?? undefined,
            comment: updatebookdto.comment ?? undefined
        });

        if (!booktoupdate) {
            throw new Error('book not found');
        }

        if (updatebookdto.image) {
            booktoupdate.image = updatebookdto.image;
        }

        // Récupérer la catégorie
        if (updatebookdto.category) {

            const category = await this.categoryrepository.findOne({
                where: {
                    id: updatebookdto.category
                }
            });

            if (!category) {
                throw new Error('Category not found');
            }

            // Affecter la catégorie au livre
            booktoupdate.category = category;
        }

        return await this.bookrepository.save(booktoupdate);
    }

    async findBooksByUser(userId: number) {
        return await this.bookrepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.users', 'user')
            .leftJoinAndSelect('book.category', 'category')
            .where('user.id = :userId', { userId })
            .getMany();
    }
}
