import { rule, and } from 'graphql-shield';
import { Context } from '../types';
import { getUserId, getUser } from '../utils';

export const isTaskAssignee = rule()(
  async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const assignee = await context.prisma.task({ id }).assignee();
    return userId === assignee.id;
  },
);

export const isTaskProjectOwner = rule()(
  async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const owner = await context.prisma
      .task({ id })
      .project()
      .owner();
    return userId === owner.id;
  },
);

export const canCreateTask = rule()(
  async (parent, { projectId }, context: Context) => {
    const userProjects = await getUser(context).ownedProjects({
      where: { id: projectId },
    });
    return !!userProjects.length;
  },
);

export const canEditTask = and(isTaskAssignee, isTaskProjectOwner);
