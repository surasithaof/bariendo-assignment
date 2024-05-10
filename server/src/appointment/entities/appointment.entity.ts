import { ApiProperty } from '@nestjs/swagger';

// TODO:
export class AppointmentEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  organizationId: number;
}
