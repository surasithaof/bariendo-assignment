import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up';
import { AuthEntity } from './entities/auth.entity';
import { UserService } from 'src/user/user.service';
import { generateSalt, hashPassword } from 'src/utils/cryptography';
import { OrgService } from 'src/org/org.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
    private orgService: OrgService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: SignUpDto): Promise<AuthEntity> {
    const duplicateUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (duplicateUser) {
      throw new HttpException('User already exists', 400);
    }

    const salt = await generateSalt();
    const password = await hashPassword(createUserDto.password, salt);

    const newUser = await this.userService.createUser({
      email: createUserDto.email,
      salt: salt,
      password: password,
    });

    const { accessToken, expiresIn: accessTokenExpire } =
      this.generateAccessToken(newUser);
    const { refreshToken, expiresIn: refeshTokenExpire } =
      this.generateRefreshToken(newUser);

    await this.cacheManager.set(
      refreshToken,
      JSON.stringify({ refreshToken, userId: newUser.id }),
      refeshTokenExpire,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessTokenExpire,
      user: newUser,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthEntity> {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const password = await hashPassword(signInDto.password, user.salt);
    if (password !== user.password) {
      throw new HttpException('Invalid credentials', 400);
    }

    const { accessToken, expiresIn: accessTokenExpire } =
      this.generateAccessToken(user);
    const { refreshToken, expiresIn: refeshTokenExpire } =
      this.generateRefreshToken(user);

    await this.cacheManager.set(
      refreshToken,
      JSON.stringify({ refreshToken, userId: user.id }),
      refeshTokenExpire,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessTokenExpire,
      user: user,
    };
  }

  async refreshToken(oldRefreshToken: string): Promise<AuthEntity> {
    const cached = await this.cacheManager.get(oldRefreshToken);
    if (!cached) {
      throw new HttpException('Invalid refresh token', 400);
    }

    const { userId, refreshToken: cachedRefreshToken } = JSON.parse(
      cached as string,
    );
    if (cachedRefreshToken !== oldRefreshToken) {
      throw new HttpException('Invalid refresh token', 400);
    }

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', 400);
    }
    const { accessToken, expiresIn: accessTokenExpire } =
      this.generateAccessToken(user);
    const { refreshToken: newRefreshToken, expiresIn: refeshTokenExpire } =
      this.generateRefreshToken(user);

    await this.cacheManager.set(
      newRefreshToken,
      JSON.stringify({ newRefreshToken, userId: user.id }),
      refeshTokenExpire,
    );

    await this.cacheManager.del(oldRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: accessTokenExpire,
      user: user,
    };
  }

  async signOut(refreshToken: string) {
    await this.cacheManager.del(refreshToken);
  }

  generateAccessToken(user: UserEntity): {
    accessToken: string;
    expiresIn: number;
  } {
    const accessToken = this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      },
    );
    return {
      accessToken,
      expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
    };
  }

  generateRefreshToken(user: UserEntity): {
    refreshToken: string;
    expiresIn: number;
  } {
    const tokenId = uuid();
    const refreshToken = this.jwtService.sign(
      { userId: user.id, tokenId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );
    return {
      refreshToken,
      expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
    };
  }
}
