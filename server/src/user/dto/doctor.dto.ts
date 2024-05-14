import { ApiProperty } from '@nestjs/swagger';
import { UserOrganizationDto } from './user-orgs.dto';

export class DoctorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  userOrganization?: UserOrganizationDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
