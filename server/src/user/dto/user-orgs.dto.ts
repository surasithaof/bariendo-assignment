import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { UserDto } from './user.dto';
import { OrgDto } from 'src/org/dto/org.entity';

export class UserOrganizationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  user?: UserDto;

  @ApiProperty()
  organizationId: number;

  @ApiProperty()
  organization?: OrgDto;

  @ApiProperty()
  role: $Enums.Role;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
