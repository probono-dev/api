import { prismaObjectType } from 'nexus-prisma';
import { isAuthenticated } from '../rules/user';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { requiredStringArg } from '../utils';
import { Context } from '../types';
import { regexp, combine, maxLength } from '../validate';

const validateName = combine(regexp(/^[a-z0-9]+$/), maxLength(16));

export const Tag = prismaObjectType({
  name: 'Tag',
  definition(t) {
    t.prismaFields(['id', 'name', 'projects']);
  },
});

export const createTag = (t: ObjectDefinitionBlock<'Mutation'>) => {
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
      return await ctx.prisma.createTag({
        name,
      });
    },
  });
};

export const tagPrismaMutations = [];

export const tagPrismaQueries = ['tag', 'tags', 'tagsConnection'];

export const tagMutationPermissions = {
  createTag: isAuthenticated,
};
