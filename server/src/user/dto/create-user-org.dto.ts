import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserOrgDto {
  @ApiProperty()
  role: Role;

  @ApiProperty()
  name: string;
}
