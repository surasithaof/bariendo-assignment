import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MigrateDeploy } from '@prisma/migrate';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    if (process.env.DATABASE_AUTO_MIGRATE === 'true') {
      const migrate = MigrateDeploy.new();
      await migrate.parse([]);
    }
  }
}
