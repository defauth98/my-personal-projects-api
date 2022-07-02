import { Prisma } from '@prisma/client';

export class ProjectsHasTag
  implements Prisma.ProjectHasTagsUncheckedCreateInput
{
  id?: number;
  project_id: number;
  tag_id: number;
}
