import { prismaObjectType } from 'nexus-prisma';

export const Task = prismaObjectType({
  name: 'Task',
  definition(t) {
    t.prismaFields([
      'id',
      'createdAt',
      'updatedAt',
      'name',
      'description',
      'project',
      'subTasks',
      'status',
      'assignee',
    ]);
  },
});
