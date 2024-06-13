import { Injectable } from '@nestjs/common';
import { apiService } from '../amoCRM/api.service';


@Injectable()
export class LeadsService {

    constructor(private readonly api: apiService) {
    }



    async getLeads(query?: string | Number) {
    return await this.api.getAllLeads(query)
  }

}
