import { ApiProperty } from '@nestjs/swagger';
import { Appointments } from '@prisma/client';
import { OrgEntity } from 'src/org/entities/org.entity';
import { DoctorEntity } from 'src/user/entities/doctor.entity';
import { PatientEntity } from 'src/user/entities/patient.entity';

export class AppointmentEntity implements Appointments {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  patient: PatientEntity;

  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  doctor: DoctorEntity;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  organizationId: number;

  @ApiProperty()
  organization: OrgEntity;
}
