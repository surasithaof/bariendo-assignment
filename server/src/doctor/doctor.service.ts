import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDto } from 'src/user/dto/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async getDoctors(orgId: number): Promise<DoctorDto[]> {
    return this.prisma.doctor.findMany({
      where: {
        userOrganizationId: orgId,
      },
      include: {
        userOrganization: true,
      },
      orderBy: {
        userOrganization: {
          name: 'asc',
        },
      },
    });
  }
}
