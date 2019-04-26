import { prismaObjectType } from 'nexus-prisma';

export const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      'email',
      'createdAt',
      'bio',
      'imageUrl',
      'location',
      'company',
      'ownedProjects',
      'contributions',
      'tasks',
    ]);
  },
});
