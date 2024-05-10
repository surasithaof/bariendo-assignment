import { Injectable } from '@nestjs/common';
import { OrgEntity } from './entities/org.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrgService {
  constructor(private prisma: PrismaService) {}

  async getOrgs(): Promise<OrgEntity[]> {
    return this.prisma.organization.findMany();
  }
}
