import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '@prisma/client';

export class OrgEntity implements Organization {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
