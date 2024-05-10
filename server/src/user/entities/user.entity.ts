import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role, User } from '@prisma/client';
import { OrgEntity } from 'src/org/entities/org.entity';
import { PatientEntity } from './patient.entity';
import { DoctorEntity } from './doctor.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @Exclude()
  salt: string;

  @Exclude()
  password: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  organizationId: number;

  @ApiProperty()
  organization?: OrgEntity;

  @ApiProperty()
  patient?: PatientEntity;

  @ApiProperty()
  doctor?: DoctorEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
