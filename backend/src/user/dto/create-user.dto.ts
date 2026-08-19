import { IsEmail, isEmail, isNotEmpty, IsNotEmpty, isString, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {

@IsString()
@IsNotEmpty()
    username: string;
@IsEmail()
@IsNotEmpty()
    email: string;

 @IsString()
 @IsNotEmpty()
 @MinLength(6)
    password: string;
       
}
