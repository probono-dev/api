import { shield } from 'graphql-shield';
import { projectMutationPermissions } from './resolvers/Project';
import { isAuthenticated } from './rules/user';

export const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    ...projectMutationPermissions
  },
});
