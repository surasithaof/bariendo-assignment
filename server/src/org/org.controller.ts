import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrgService } from './org.service';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrgEntity } from './entities/org.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orgs')
@ApiTags('orgs')
export class OrgController {
  private readonly orgService: OrgService;
  constructor(orgService: OrgService) {
    this.orgService = orgService;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ description: 'Orgs list', type: [OrgEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getOrgs() {
    return this.orgService.getOrgs();
  }
}
