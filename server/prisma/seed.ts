import { PrismaClient } from '@prisma/client';
import { generateSalt, hashPassword } from '../src/utils/cryptography';
const prisma = new PrismaClient();

async function main() {
  const SUPERADMIN_INITIAL_PASSWORD = 'P@ssw0rd!';
  const salt = await generateSalt();
  const hashedPassword = await hashPassword(SUPERADMIN_INITIAL_PASSWORD, salt);

  await prisma.user.create({
    data: {
      email: 'superadmin@bariendo.com',
      password: hashedPassword,
      salt: salt,
      role: 'SuperAdmin',
    },
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
