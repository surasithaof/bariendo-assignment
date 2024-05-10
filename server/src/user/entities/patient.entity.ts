import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '@prisma/client';

// TODO:
export class PatientEntity implements Patient {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  organizationId: number;
}
