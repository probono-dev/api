import { prismaObjectType } from 'nexus-prisma';
import { registerDefinitions } from '../utils';
import { categoryPrismaMutations, categoryMutations } from './Category';
import { projectPrismaMutations, projectMutations } from './Project';
import { tagPrismaMutations, tagMutations } from './Tag';
import { taskPrismaMutations } from './Task';
import { userMutations, userPrismaMutations } from './User';
import {
  organisationMutations,
  organisationPrismaMutations,
} from './Organisation';

export const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    registerDefinitions(
      t,
      userMutations,
      projectMutations,
      categoryMutations,
      tagMutations,
      organisationMutations,
    );

    t.prismaFields([
      ...projectPrismaMutations,
      ...categoryPrismaMutations,
      ...tagPrismaMutations,
      ...taskPrismaMutations,
      ...organisationPrismaMutations,
      ...userPrismaMutations,
    ]);
  },
});
