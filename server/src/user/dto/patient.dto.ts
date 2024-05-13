import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
