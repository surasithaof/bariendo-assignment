import { PrismaClient, Role } from '@prisma/client';
import { generateSalt, hashPassword } from '../src/utils/cryptography';
const prisma = new PrismaClient();

async function main() {
  const SUPERADMIN_INITIAL_PASSWORD = 'P@ssw0rd!';
  const salt = await generateSalt();
  const hashedPassword = await hashPassword(SUPERADMIN_INITIAL_PASSWORD, salt);

  await prisma.organization.createMany({
    data: [
      {
        name: 'Org A',
      },
      {
        name: 'Org B',
      },
      {
        name: 'Org C',
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'superadmin@bariendo.com',
        password: hashedPassword,
        salt: salt,
        isSuperAdmin: true,
      },
      {
        email: 'admin@orga.com',
        password: hashedPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'admin@orgb.com',
        password: hashedPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'admin@orgc.com',
        password: hashedPassword,
        salt: salt,
        isSuperAdmin: false,
      },
    ],
  });

  // await
  await prisma.userOrganization.createMany({
    data: [
      {
        organizationId: 1,
        userId: 1,
        role: Role.Admin,
        name: 'Admin Org A',
      },
      {
        organizationId: 2,
        userId: 2,
        role: Role.Admin,
        name: 'Admin Org B',
      },
      {
        organizationId: 3,
        userId: 3,
        role: Role.Admin,
        name: 'Admin Org C',
      },
    ],
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//  This script will create a superadmin user with email
