import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import {
  selectPrisma,
  requiredStringArg,
  requiredIdArg,
  optionalStringArg,
  optionalIdArg,
} from '../utils';
import { Context } from '../types';
import * as slug from 'slug';
import { canEditTask, canCreateTask } from '../rules/task';

export const Task = prismaObjectType({
  name: 'Task',
  definition(t) {
    t.prismaFields(['*']);
  },
});

export const taskMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createTask', {
    type: 'Task',
    args: {
      name: requiredStringArg({
        description: 'Name of the task to be created.',
      }),
      projectId: requiredStringArg({
        description: 'ID of the **Project** to be linked with this task.',
      }),
      assigneeId: optionalIdArg({
        description: 'ID of the **User** who will be assigned to this task.',
      }),
    },
    resolve: async (_, { name, projectId, assigneeId }, ctx: Context) => {
      return ctx.prisma.createTask({
        name,
        slug: slug(name),
        project: { connect: { id: projectId } },
        assignee: { connect: { id: assigneeId } },
      });
    },
  });

  t.field('updateTask', {
    type: 'Task',
    args: {
      id: requiredIdArg({ description: 'ID of the **Task** to be updated.' }),
      name: optionalStringArg({ description: 'New name of the **Task**.' }),
      assigneeId: optionalIdArg({
        description: 'ID of the new **User** to be assigned to this task.',
      }),
    },
    resolve: async (_, { id, name, assigneeId }, ctx: Context) => {
      return ctx.prisma.updateTask({
        where: { id },
        data: {
          name,
          slug: slug(name),
          assignee: { connect: { id: assigneeId } },
        },
      });
    },
  });
};

export const taskPrismaQueries = selectPrisma<'Query'>([
  'task',
  'tasks',
  'tasksConnection',
]);

export const taskPrismaMutations = selectPrisma<'Mutation'>([]);

export const taskMutationPermissions = {
  createTask: canCreateTask,
  updateTask: canEditTask,
};
