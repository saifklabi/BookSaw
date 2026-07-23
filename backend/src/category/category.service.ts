import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()

export class CategoryService {
 constructor(@InjectRepository(Category) private categoryrepository:Repository<Category>) {}
 create(createCategoryDto: CreateCategoryDto) {
    const newcategory = this.categoryrepository.create(createCategoryDto)
    return this.categoryrepository.save(newcategory);
  }

  findAll() {
return this.categoryrepository.find();
  }

  findOne(id: number) {
    return  this.categoryrepository.findOne({where :{id}});
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<Category>
  {
    const categorytoupdate =await this.categoryrepository.preload({id,...updateCategoryDto})
    if (!categorytoupdate) 
    {throw new NotFoundException("category not found")}
      return this.categoryrepository.save(categorytoupdate);
  }

  async remove(id: number) {
    const categorybyid=await this.categoryrepository.findBy(  {id})
    if (!categorybyid)
      {
        throw new NotFoundException('category not found');
      }
       return this.categoryrepository.delete(categorybyid);
  }
}
