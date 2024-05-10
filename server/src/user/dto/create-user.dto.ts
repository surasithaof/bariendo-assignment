import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @Exclude()
  salt: string;

  @Exclude()
  password: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  organizationId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
