import { prismaObjectType } from 'nexus-prisma';

export const Task = prismaObjectType({
  name: 'Task',
  definition(t) {
    t.prismaFields(['*']);
  },
});

export const taskPrismaQueries = ['task', 'tasks', 'tasksConnection'];

export const taskPrismaMutations = ['deleteTask'];
