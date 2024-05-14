import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserOrganizationEntity } from './entities/user-orgs.entity';
import { CreateUserOrgDto } from './dto/create-user-org.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  private readonly userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ description: 'Users list', type: [UserEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  @ApiOkResponse({ description: 'Users list', type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId/orgs')
  @ApiOkResponse({ description: 'Users list', type: [UserOrganizationEntity] })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserOrgs(@Param('userId', ParseIntPipe) userId: number) {
    const userOrgs = await this.userService.getUserOrgsByUserId(userId);
    return userOrgs;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId/orgs/:orgId')
  @ApiOkResponse({ description: 'Users list', type: [UserOrganizationEntity] })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserOrgById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('orgId', ParseIntPipe) orgId: number,
  ) {
    const userOrg = await this.userService.getUserOrgsById(userId, orgId);
    return userOrg;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':userId/orgs/:orgId')
  @ApiOkResponse({ description: 'Users list', type: [UserOrganizationEntity] })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createUserOrgs(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('orgId', ParseIntPipe) orgId: number,
    @Body() createUserOrgDto: CreateUserOrgDto,
  ) {
    const userOrg = await this.userService.createUserOrg(
      userId,
      orgId,
      createUserOrgDto,
    );
    if (!userOrg) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
    return userOrg;
  }
}
