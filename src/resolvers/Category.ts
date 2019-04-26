import { prismaObjectType } from 'nexus-prisma';
import { isAuthenticated, isAdmin } from '../rules/user';
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core';
import { Context } from '../types';

export const Category = prismaObjectType({
  name: 'Category',
  definition(t) {
    t.prismaFields(['id', 'name', 'projects', 'slug']);
  },
});

export const approveCategory = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('approveCategory', {
    type: 'Category',
    args: {
      id: stringArg({ nullable: false }),
    },
    resolve: async (_, { id }, ctx: Context) => {
      return await ctx.prisma.updateCategory({
        data: { approved: true },
        where: { id },
      });
    },
  });
};

export const categoryPrismaQueries = ['category', 'categories'];

export const categoryPrismaMutations = ['createCategory', 'deleteCategory'];

export const categoryMutationPermissions = {
  createCategory: isAuthenticated,
  approveCategory: isAdmin,
  deleteCategory: isAdmin,
};
