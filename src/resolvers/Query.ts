import { registerDefinitions } from '../utils';
import me from './queries/me';
import { prismaObjectType } from 'nexus-prisma';
import { projectPrismaQueries } from './Project';
import { categoryPrismaQueries } from './Category';

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    registerDefinitions(t, me);

    t.prismaFields([...projectPrismaQueries, ...categoryPrismaQueries]);
  },
});
