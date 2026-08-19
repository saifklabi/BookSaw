import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ReturningStatementNotSupportedError } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
@Post("/login")
login(@Body()CreateAuthDto: CreateAuthDto) {
  return this.authService.login(CreateAuthDto)
}

}
