import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { generateSalt, hashPassword } from 'src/utils/cryptography';
import { OrgService } from 'src/org/org.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userService: UserService,
    private orgService: OrgService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: SignUpDto): Promise<AuthDto> {
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

    await this.cacheToken(
      accessToken,
      refreshToken,
      newUser.id,
      refeshTokenExpire,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessTokenExpire,
      user: newUser,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthDto> {
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

    await this.cacheToken(
      accessToken,
      refreshToken,
      user.id,
      refeshTokenExpire,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: accessTokenExpire,
      user: user,
    };
  }

  async refreshToken(
    oldAccressToken: string,
    oldRefreshToken: string,
  ): Promise<AuthDto> {
    const cacheKey = this.getTokenCacheKey(oldAccressToken, oldRefreshToken);
    const cached = await this.cacheManager.get(cacheKey);
    if (!cached) {
      console.error('cached not found');
      throw new HttpException('Invalid refresh token', 400);
    }

    const { userId, refreshToken: cachedRefreshToken } = JSON.parse(
      cached as string,
    );
    if (cachedRefreshToken !== oldRefreshToken) {
      console.error(
        'cachedRefreshToken !== oldRefreshToken',
        cachedRefreshToken,
        oldRefreshToken,
      );
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

    await this.cacheToken(
      accessToken,
      newRefreshToken,
      user.id,
      refeshTokenExpire,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: accessTokenExpire,
      user: user,
    };
  }

  generateAccessToken(user: UserDto): {
    accessToken: string;
    expiresIn: number;
  } {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
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

  generateRefreshToken(user: UserDto): {
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

  getTokenCacheKey(accessToken: string, refreshToken: string) {
    return `token.${accessToken}.${refreshToken}`;
  }

  async cacheToken(
    accessToken: string,
    refreshToken: string,
    userId: number,
    expiresIn: number,
  ) {
    await this.cacheManager.set(
      this.getTokenCacheKey(accessToken, refreshToken),
      JSON.stringify({ refreshToken, userId }),
      expiresIn * 1000,
    );
  }
}
