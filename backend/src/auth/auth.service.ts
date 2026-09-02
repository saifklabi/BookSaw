import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
constructor( private  userService:UserService ){}
   async register(createuserdto: CreateUserDto) {
    const userwithemail= await this.userService.findbyemail(createuserdto.email)
    if(userwithemail){
      throw new NotFoundException("user with this email already exisit")
    }
   /*  hash password */
   const hashedpassword= await bcrypt.hash(createuserdto.password,10)
   createuserdto.password=hashedpassword
   const user = this.userService.create(createuserdto)
    return user;
  }

  async login (createauthdto:CreateAuthDto) 
  {
    const userwiththisemail = await this.userService.findbyemail(createauthdto.email)
    if(!userwiththisemail){
      throw new NotFoundException("this email does not exisit")
    
    }
    const passwordtrue = await bcrypt.compare(createauthdto.password,userwiththisemail.password)
    if(!passwordtrue){
      throw new NotFoundException("password does not match ")
      
    }
    else{
      return { message: "connect successfully", user: { id: userwiththisemail.id, username: userwiththisemail.username, email: userwiththisemail.email, role: userwiththisemail.role, } };
    

    }
}
}
