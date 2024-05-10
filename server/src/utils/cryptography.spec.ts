import { comparePassword, generateSalt, hashPassword } from './cryptography';

describe('utils/cryptography', () => {
  let salt: string;
  let hashedPassword: string;
  const password: string = 'p@ssword!';

  beforeEach(async () => {});

  it('should generate a salt', async () => {
    salt = await generateSalt();
    expect(salt).toBeDefined();
    console.log('salt', salt);
  });

  it('should hash a password', async () => {
    hashedPassword = await hashPassword(password, salt);
    expect(hashedPassword).toBeDefined();
    console.log('hashedPassword', hashedPassword);
  });

  it('should compare a password', async () => {
    expect(await comparePassword(password, hashedPassword)).toBe(true);
    expect(await hashPassword(password, salt)).toEqual(hashedPassword);
  });
});
