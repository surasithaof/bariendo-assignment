import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
