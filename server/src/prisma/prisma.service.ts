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

  // Exclude keys from an object
  excludeFromObject<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
    ) as Omit<T, K>;
  }

  // Exclude keys from objects in a list
  excludeFromList<T, K extends keyof T>(
    objects: T[],
    keysToDelete: K[],
  ): Omit<T, K>[] {
    return objects.map((obj) =>
      this.excludeFromObject(obj, keysToDelete),
    ) as Omit<T, K>[];
  }
}
