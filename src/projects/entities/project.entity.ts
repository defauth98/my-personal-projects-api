import { Prisma } from '@prisma/client';

export class Projects implements Prisma.ProjectUncheckedCreateInput {
  id?: number;
  name: string;
  description: string;
  thumbnailPath: string;
  gifPath: string;
  link: string;
  repoLink: string;
  faviconLink: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  hidden?: boolean;
  ProjectHasTags?: Prisma.ProjectHasTagsUncheckedCreateNestedManyWithoutProjectInput;
}
