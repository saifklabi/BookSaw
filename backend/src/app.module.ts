import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bookModule } from './bouk/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres', 
      host: 'localhost',
       port: 5432, 
       username: 'postgres', 
       password: '1234saif', 
       database: 'MyLibrary', 
       entities: [__dirname + '/**/*.entity{.ts,.js}'], 
       synchronize: true,  }),
    CategoryModule,
    bookModule,
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
