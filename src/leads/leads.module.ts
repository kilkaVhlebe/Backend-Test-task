import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { apiService } from '../amoCRM/api.service';



@Module({
  providers: [LeadsService, apiService],
  imports: [  ]
})
export class LeadsModule {}
