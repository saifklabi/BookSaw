import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsNumber } from "class-validator";

export class Createbookdto{
@IsString()
@IsNotEmpty()
name : string
@IsString()
@IsNotEmpty()
author : string
@IsString()
@IsNotEmpty()
description: string
@IsOptional()
@Type(() => Number)
@IsNumber()
@IsOptional()
rating?: number;
@IsOptional()
@IsString()
comment?: string;
@IsOptional()
@IsString()
image : string
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    category?: number;
}