import { IsEmail, isEmail, isNotEmpty, IsNotEmpty, isString, IsString, MinLength, minLength, IsEnum, IsOptional } from "class-validator";

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

 @IsOptional()
 @IsEnum(["admin", "librarian", "client"])
    role?: string = "client";
       
}
