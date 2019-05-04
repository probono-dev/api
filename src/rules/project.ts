import { rule } from 'graphql-shield';
import { Context } from '../types';
import { getUserId } from '../utils';

export const isProjectOwner = rule()(
  async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.project({ id }).owner();
    return userId === author.id;
  },
);
