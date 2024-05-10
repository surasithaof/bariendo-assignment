import { HttpException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up';
import { AuthEntity } from './entities/auth.entity';
import { UserService } from 'src/user/user.service';
import { generateSalt, hashPassword } from 'src/utils/cryptography';
import { OrgService } from 'src/org/org.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private orgService: OrgService,
  ) {}

  async signUp(createUserDto: SignUpDto): Promise<AuthEntity> {
    console.log(createUserDto);
    const duplicateUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (duplicateUser) {
      throw new HttpException('User already exists', 400);
    }

    const org = await this.orgService.getOrgById(createUserDto.organizationId);
    if (!org) {
      throw new HttpException('Organization not found', 400);
    }

    const salt = await generateSalt();
    const password = await hashPassword(createUserDto.password, salt);

    const newUser = await this.userService.createUser({
      email: createUserDto.email,
      password: password,
      salt: salt,
      role: createUserDto.role,
      organizationId: createUserDto.organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (createUserDto.role === 'Doctor') {
      this.userService.createDoctor({
        userId: newUser.id,
        name: createUserDto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: createUserDto.organizationId,
      });
    } else if (createUserDto.role === 'Patient') {
      this.userService.createPatient({
        userId: newUser.id,
        name: createUserDto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        organizationId: createUserDto.organizationId,
      });
    }

    // todo: generate token.

    // todo: cash token.

    return new AuthEntity();
  }

  async signIn(signInDto: SignInDto): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new HttpException('Invalid email or password', 400);
    }

    const password = await hashPassword(signInDto.password, user.salt);
    if (password !== user.password) {
      throw new HttpException('Invalid email or password', 400);
    }

    // todo: generate token.

    // todo: cash token.

    return new AuthEntity();
  }

  async refreshToken(refreshToken: string): Promise<AuthEntity> {
    console.log(refreshToken);

    // todo: check if token is valid.

    // todo: generate new token.

    return new AuthEntity();
  }

  async signOut(refreshToken: string) {
    // todo: remove token from cache.

    console.log(refreshToken);
  }
}
