import { Body, Controller, Post } from '@nestjs/common';

import { Createbookdto } from './dto/create-book.dto';
import { bookService } from './book.service';

@Controller('book')
export class bookController {
constructor(private readonly bookService: bookService) {}
@Post()
create(@Body() createbookdto: Createbookdto) {
    return this.bookService.addbook(createbookdto);
  }
}
