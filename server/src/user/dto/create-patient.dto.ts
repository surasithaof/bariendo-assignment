import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  organizationId: number;
}
