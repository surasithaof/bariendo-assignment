import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '@prisma/client';

export class DoctorEntity implements Doctor {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  organizationId: number;
}
