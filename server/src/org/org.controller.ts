import { Controller, Get } from '@nestjs/common';
import { OrgService } from './org.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrgEntity } from './entities/org.entity';

@Controller('orgs')
@ApiTags('orgs')
export class OrgController {
  private readonly orgService: OrgService;
  constructor(orgService: OrgService) {
    this.orgService = orgService;
  }

  @Get()
  @ApiOkResponse({ description: 'Orgs list', type: [OrgEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getOrgs() {
    return this.orgService.getOrgs();
  }
}
