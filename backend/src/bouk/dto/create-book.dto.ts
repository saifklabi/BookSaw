import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class Createbookdto{
@IsString()
@IsNotEmpty()
@MaxLength(20)
name : string
@IsString()
@MaxLength(20)
@IsNotEmpty()
authour : string
@IsString()
@IsNotEmpty()
discription: string
}