import { prismaObjectType } from 'nexus-prisma';
import { registerDefinitions } from '../utils';
import { categoryPrismaQueries } from './Category';
import { projectPrismaQueries } from './Project';
import me from './queries/me';
import { tagPrismaQueries } from './Tag';

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    registerDefinitions(t, me);

    t.prismaFields([...projectPrismaQueries, ...categoryPrismaQueries, ...tagPrismaQueries]);
  },
});
