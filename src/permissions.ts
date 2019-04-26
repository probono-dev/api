import { shield } from 'graphql-shield';
import { isAuthenticated } from './rules/user';
import { projectMutationPermissions } from './resolvers/Project';

export const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    ...projectMutationPermissions
  },
});
