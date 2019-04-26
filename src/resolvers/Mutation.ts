import { mutationType } from 'nexus';
import signup from './mutations/signup';
import login from './mutations/login';
import { registerDefinitions } from '../utils';
import { prismaObjectType } from 'nexus-prisma';
import { projectPrismaMutations, createProject } from './Project';

export const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    registerDefinitions(t, login, signup, createProject);

    t.prismaFields([...projectPrismaMutations]);
  },
});
