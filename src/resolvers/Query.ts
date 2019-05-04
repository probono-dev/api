import { prismaObjectType } from 'nexus-prisma';
import { registerDefinitions } from '../utils';
import { categoryPrismaQueries } from './Category';
import { projectPrismaQueries } from './Project';
import { tagPrismaQueries } from './Tag';
import { taskPrismaQueries } from './Task';
import { userQueries, userPrismaQueries } from './User';
import { organisationPrismaQueries } from './Organisation';

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    registerDefinitions(t, userQueries);

    t.prismaFields([
      ...projectPrismaQueries,
      ...categoryPrismaQueries,
      ...tagPrismaQueries,
      ...taskPrismaQueries,
      ...organisationPrismaQueries,
      ...userPrismaQueries,
    ]);
  },
});
