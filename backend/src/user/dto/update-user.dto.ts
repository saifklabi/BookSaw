
import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends  PartialType(CreateUserDto) {}
