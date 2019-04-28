import { mutationType } from 'nexus';
import { prismaObjectType } from 'nexus-prisma';
import { registerDefinitions } from '../utils';
import {
  approveCategory,
  categoryPrismaMutations,
  createCategory,
} from './Category';
import login from './mutations/login';
import signup from './mutations/signup';
import { createProject, projectPrismaMutations } from './Project';
import { createTag } from './Tag';

export const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    registerDefinitions(
      t,
      login,
      signup,
      createProject,
      createCategory,
      approveCategory,
      createTag,
    );

    t.prismaFields([...projectPrismaMutations, ...categoryPrismaMutations]);
  },
});
