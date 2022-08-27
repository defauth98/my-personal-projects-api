import { Prisma } from '@prisma/client';

export class ApiStatus implements Prisma.apiStatusUncheckedCreateInput {
  id?: number;
  link: string;
}
