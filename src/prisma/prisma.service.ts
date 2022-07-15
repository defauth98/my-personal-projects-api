import { INestApplication, Logger, OnModuleInit } from '@nestjs/common';
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

    this.$use(async (params, next) => {
      if (params.model == 'Project') {
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst'
          params.args.where['deleted'] = null
        }
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.deleted == undefined) {
              params.args.where['deleted'] = null
            }
          } else {
            params.args['where'] = { deleted: null }
          }
        }
      }
      return next(params)
    })
  
    this.$use(async (params, next) => {
      if (params.model == 'Project') {
        if (params.action == 'update') {
          params.action = 'updateMany'
          params.args.where['deleted'] = null
        }
        if (params.action == 'updateMany') {
          if (params.args.where != undefined) {
            params.args.where['deleted'] = null
          } else {
            params.args['where'] = { deleted: null }
          }
        }
      }
      return next(params)
    })
  
    this.$use(async (params, next) => {
      if (params.model == 'Project') {
        if (params.action == 'delete') {
          params.action = 'update'
          params.args['data'] = { deleted: new Date() }
        }
        if (params.action == 'deleteMany') {
          params.action = 'updateMany'
          if (params.args.data != undefined) {
            params.args.data['deleted'] = new Date()
          } else {
            params.args['data'] = { deleted: new Date() }
          }
        }
      }
      return next(params)
    })

  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      console.log('close connection');
      await app.close();
    });
  }
}
