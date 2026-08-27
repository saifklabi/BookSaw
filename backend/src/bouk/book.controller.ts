import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';

   
import { Createbookdto } from './dto/create-book.dto';
import { bookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/win32';


@Controller('book')
export class bookController {
constructor(private readonly bookService: bookService) {}
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))

@Post()
  create(@Body() createbookdto: Createbookdto, @UploadedFile() image) {
    createbookdto.image = image ? image.filename : null ;
    return this.bookService.addbook(createbookdto);

  }
@Get()
findAll() {
    return this.bookService.findAll();

  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Patch(':id')
  update(@Param('id') id: string, @Body() createbookdto: Createbookdto, @UploadedFile() image) {
    createbookdto.image = image ? image.filename : null;
    return this.bookService.update(+id, createbookdto);
  }
}
