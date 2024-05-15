import { PrismaClient, Role } from '@prisma/client';
import { generateSalt, hashPassword } from '../src/utils/cryptography';
const prisma = new PrismaClient();

async function main() {
  const salt = await generateSalt();
  const adminPassword = await hashPassword('P@ssw0rd!', salt);
  const userPassword = await hashPassword('password', salt);

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
        password: adminPassword,
        salt: salt,
        isSuperAdmin: true,
      },
      {
        email: 'admin@orga.com',
        password: adminPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'admin@orgb.com',
        password: adminPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'admin@orgc.com',
        password: adminPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'usera@orga.com',
        password: userPassword,
        salt: salt,
        isSuperAdmin: false,
      },
      {
        email: 'userb@orga.com',
        password: userPassword,
        salt: salt,
        isSuperAdmin: false,
      },
    ],
  });

  await prisma.userOrganization.createMany({
    data: [
      {
        organizationId: 1,
        userId: 2,
        role: Role.Admin,
        name: 'Admin Org A',
      },
      {
        organizationId: 2,
        userId: 3,
        role: Role.Admin,
        name: 'Admin Org B',
      },
      {
        organizationId: 3,
        userId: 4,
        role: Role.Admin,
        name: 'Admin Org C',
      },
      {
        organizationId: 1,
        userId: 5,
        role: Role.Patient,
        name: 'User A',
      },
      {
        organizationId: 1,
        userId: 6,
        role: Role.Doctor,
        name: 'Dr. B',
      },
    ],
  });

  await prisma.patient.createMany({
    data: [
      {
        userOrganizationId: 4,
      },
    ],
  });

  await prisma.doctor.createMany({
    data: [
      {
        userOrganizationId: 5,
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
