import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Createbookdto } from './dto/create-book.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class bookService {
    constructor(@InjectRepository(Book) private bookrepository:Repository<Book>,
@InjectRepository(Category) private categoryrepository:Repository<Category>){}
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
findAll(){
    return this.bookrepository.find({ relations: { category: true } })
}
async findOne(id:number){
    return await this.bookrepository.findOne({ where: { id }, relations: { category: true } })
}
async remove(id:number){
    const bookid= await this.bookrepository.findBy({id})
    if(!bookid){
        throw new Error('book not found')
    }
    await this.bookrepository.remove(bookid)
    return "book deleted successfully"


}
    async update(id: number, createbookdto: Createbookdto) {

        const booktoupdate = await this.bookrepository.preload({
            id,
            name: createbookdto.name,
            author: createbookdto.author,
            description: createbookdto.description,
            image: createbookdto.image || undefined,
            rating: createbookdto.rating ?? undefined,
            comment: createbookdto.comment ?? undefined
        });

        if (!booktoupdate) {
            throw new Error('book not found');
        }

        if (createbookdto.image) {
            booktoupdate.image = createbookdto.image;
        }

        // Récupérer la catégorie
        if (createbookdto.category) {

            const category = await this.categoryrepository.findOne({
                where: {
                    id: createbookdto.category
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
}
