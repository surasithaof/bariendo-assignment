import * as bcrypt from 'bcrypt';

export function generateSalt(): Promise<string> {
  return bcrypt.genSalt(10);
}

export function hashPassword(password: string, salt: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

export function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
