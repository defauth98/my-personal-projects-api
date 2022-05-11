import { INestApplication, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.verbose('DB connected');
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      console.log('close connection');
      await app.close();
    });
  }
}
