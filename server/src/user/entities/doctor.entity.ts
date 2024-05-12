import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '@prisma/client';

export class DoctorEntity implements Doctor {
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
