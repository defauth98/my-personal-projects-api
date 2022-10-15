import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWorld(): string {
    return this.appService.getHelloWorld();
  }

  @Get('status')
  async getStatus() {
    try {
      await this.prismaService.$queryRaw`select 1 + 1`;
    } catch (error) {
      return { api: 'on', db: 'off' };
    }

    return { api: 'on', db: 'on' };
  }
}
