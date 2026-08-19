import { IsNotEmpty, IsString, MaxLength, IsOptional, IsNumber } from "class-validator";

export class Createbookdto{
@IsString()
@IsNotEmpty()
@MaxLength(20)
name : string
@IsString()
@MaxLength(20)
@IsNotEmpty()
author : string
@IsString()
@IsNotEmpty()
description: string
@IsOptional()
@IsString()
image : string

category : number
}