import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/bouk/entities/book.entity';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userrepository: Repository<User>,
    @InjectRepository(Book) private bookrepository: Repository<Book>
  ) {}
  async create(createUserDto: CreateUserDto) {
   const newuser =this.userrepository.create(createUserDto)
    return await  this.userrepository.save(newuser)
    
  }

  findAll() {
    return this.userrepository.find()
  }

  
    findOne(id: number) {
    return  this.userrepository.findOne({where :{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    
    const usertoupdate =await this.userrepository.preload({id,...updateUserDto})
    if (!usertoupdate) {
      throw new NotFoundException('user not found');
    }

    return await this.userrepository.save(usertoupdate);
  }


   async remove(id: number) {
    const userbyid=await this.userrepository.findBy(  {id})
    if (!userbyid) {
      throw new NotFoundException('user not found');
    }

    return this.userrepository.delete(userbyid);
  }
  async findbyemail (email :string) {
 
     return await this.userrepository.findOneBy({email})

  }

  async borrowBook(userId: number, bookId: number) {
    // Récupérer l'utilisateur avec ses livres
    const user = await this.userrepository.findOne({
      where: { id: userId },
      relations: { books: true }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Vérifier que le livre existe
    const book = await this.bookrepository.findOne({
      where: { id: bookId }
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Vérifier si le livre est déjà emprunté
    if (user.books.some(b => b.id === bookId)) {
      throw new BadRequestException('Book already borrowed');
    }

    user.books.push(book);
    return await this.userrepository.save(user);
  }
}
