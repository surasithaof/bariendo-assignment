import { ApiProperty } from '@nestjs/swagger';
import { $Enums, UserOrganization } from '@prisma/client';

export class UserOrganizationEntity implements UserOrganization {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  organizationId: number;

  @ApiProperty()
  role: $Enums.Role;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
