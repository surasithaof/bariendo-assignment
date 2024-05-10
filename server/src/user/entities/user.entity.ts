import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

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
