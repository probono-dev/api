import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import * as slug from 'slug';
import { isAdmin, isAuthenticated } from '../rules/user';
import { Context } from '../types';
import { requiredIdArg, requiredStringArg } from '../utils';

export const Category = prismaObjectType({
  name: 'Category',
  definition(t) {
    t.prismaFields(['id', 'name', 'projects', 'slug']);
  },
});

export const createCategory = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createCategory', {
    type: 'Category',
    args: {
      name: requiredStringArg({ description: 'Name of the category.' }),
    },
    resolve: async (_, { name }, ctx: Context) => {
      return ctx.prisma.createCategory({
        name,
        slug: slug(name, { lower: true }),
        approved: false,
      });
    },
  });
};

export const approveCategory = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('approveCategory', {
    type: 'Category',
    args: {
      id: requiredIdArg({ description: 'Id of the category to be approved.' }),
    },
    resolve: async (_, { id }, ctx: Context) => {
      return ctx.prisma.updateCategory({
        data: { approved: true },
        where: { id },
      });
    },
  });
};

export const categoryPrismaQueries = ['category', 'categories'];

export const categoryPrismaMutations = ['deleteCategory'];

export const categoryMutationPermissions = {
  createCategory: isAuthenticated,
  approveCategory: isAdmin,
  deleteCategory: isAdmin,
};
