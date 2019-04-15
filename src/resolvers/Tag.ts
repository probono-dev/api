import { prismaObjectType } from 'nexus-prisma';

export const Tag = prismaObjectType({
  name: 'Tag',
  definition(t) {
    t.prismaFields(['id', 'name', 'projects']);
  },
});
