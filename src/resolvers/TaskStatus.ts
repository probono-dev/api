import { prismaEnumType } from 'nexus-prisma';

export const TaskStatus = prismaEnumType({
  name: 'TaskStatus',
  members: ['TO_DO', 'IN_PROGRESS', 'DONE'],
});
