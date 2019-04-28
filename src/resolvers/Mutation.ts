import { mutationType } from 'nexus';
import signup from './mutations/signup';
import login from './mutations/login';
import { registerDefinitions } from '../utils';
import { prismaObjectType } from 'nexus-prisma';
import { projectPrismaMutations, createProject } from './Project';
import {
  approveCategory,
  categoryPrismaMutations,
  createCategory,
} from './Category';
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
