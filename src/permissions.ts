import { rule, shield } from 'graphql-shield';
import { getUserId } from './utils';
import { Context } from './types';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isProjectOwner: rule()(async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.project({ id }).owner();
    return userId === author.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deleteProject: rules.isProjectOwner,
    publishProject: rules.isProjectOwner,
  },
});
