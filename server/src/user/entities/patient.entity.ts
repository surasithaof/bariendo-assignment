import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';

export class PatientEntity implements Patient {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userOrganizationId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
