import { ApiProperty } from '@nestjs/swagger';
import { $Enums, UserOrganization } from '@prisma/client';
import { UserEntity } from './user.entity';
import { OrgEntity } from 'src/org/entities/org.entity';

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
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  user?: UserEntity;

  @ApiProperty()
  organization?: OrgEntity;
}
