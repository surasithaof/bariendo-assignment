import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  organizationId: number;
}
