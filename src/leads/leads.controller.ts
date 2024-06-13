import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';


@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('leads')
  async getLeadsWithFilter(@Query() query?: string | Number) {
    return await this.leadsService.getLeads(query);
  }

}