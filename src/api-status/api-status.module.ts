import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ApiStatusController } from './api-status.controller';
import { ApiStatusService } from './api-status.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApiStatusController],
  providers: [ApiStatusService],
})
export class ApiStatusModule {}
