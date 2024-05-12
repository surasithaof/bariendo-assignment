import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateUserOrgDto {
  @Exclude()
  userId: number;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  organizationId: number;
}
