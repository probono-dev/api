import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { isAuthenticated } from '../rules/user';
import { Context } from '../types';
import { requiredStringArg, selectPrisma } from '../utils';
import { combine, maxLength, regexp } from '../validate';

const validateName = combine(regexp(/^[a-z0-9]+$/), maxLength(16));

export const Tag = prismaObjectType({
  name: 'Tag',
  definition(t) {
    t.prismaFields(['id', 'name', 'projects']);
  },
});

export const tagMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createTag', {
    type: 'Tag',
    args: {
      name: requiredStringArg({
        description:
          'Name of the tag. Should be unique. Should match `/^[a-z0-9]+$/` and be at most **16** characters in length.',
      }),
    },
    resolve: async (_, { name }, ctx: Context) => {
      validateName(name);
      return ctx.prisma.createTag({
        name,
      });
    },
  });
};

export const tagPrismaMutations = [];

export const tagPrismaQueries = selectPrisma<'Query'>([
  'tag',
  'tags',
  'tagsConnection',
]);

export const tagMutationPermissions = {
  createTag: isAuthenticated,
};
