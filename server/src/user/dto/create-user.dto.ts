import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @Exclude()
  salt: string;

  @Exclude()
  password: string;
}
