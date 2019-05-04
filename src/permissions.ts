import { shield, IRule } from 'graphql-shield';
import { projectMutationPermissions } from './resolvers/Project';
import {
  userMutationPermissions,
  userQueryPermissions,
} from './resolvers/User';
import { categoryMutationPermissions } from './resolvers/Category';

export const permissions = shield({
  Query: {
    ...userQueryPermissions,
  },
  Mutation: {
    ...projectMutationPermissions,
    ...userMutationPermissions,
    ...categoryMutationPermissions,
  },
});
