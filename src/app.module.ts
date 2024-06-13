import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';

import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { apiService } from './amoCRM/api.service';

@Module({
  imports: [LeadsModule,ConfigModule.forRoot({ envFilePath:`.${process.env.NODE_ENV}.env`})],
  controllers: [LeadsController],
  providers: [LeadsService, apiService],
})
export class AppModule {}
