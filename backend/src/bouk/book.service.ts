import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Createbookdto } from './dto/create-book.dto';

@Injectable()
export class bookService {
    constructor(@InjectRepository(Book) private bookrepository:Repository<Book>){}
async addbook(createbookdto:Createbookdto){
    const newbook = this.bookrepository.create(createbookdto)
    return  await this.bookrepository.save(newbook)
    
}
y


}

