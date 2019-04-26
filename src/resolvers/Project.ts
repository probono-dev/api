import { isAuthenticated } from '../rules/user';
import { isProjectOwner } from '../rules/project';
import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { stringArg } from 'nexus/dist';
import { getUserId } from '../utils';
import { Context } from '../types';
import createSlug from 'slug';

export const Project = prismaObjectType({
  name: 'Project',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      'description',
      'imageUrl',
      'owner',
      'contributors',
      'tasks',
      'category',
      'tags',
    ]);
  },
});

export const createProject = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createProject', {
    type: 'Project',
    args: {
      name: stringArg(),
      description: stringArg(),
      categoryId: stringArg(),
    },
    resolve: async (
      _,
      { name, description, categoryId },
      ctx: Context,
    ) => {
      const id = getUserId(ctx);
      const project = await ctx.prisma.createProject({
        name,
        description,
        slug: createSlug(name),
        owner: { connect: { id } },
        category: { connect: { id: categoryId } },
        imageUrl: '',
      });
      return project;
    },
  });
};

export const projectPrismaQueries = [
  'project',
  'projects',
  'projectsConnection',
];

export const projectPrismaMutations = ['updateProject', 'deleteProject'];

export const projectMutationPermissions = {
  createProject: isAuthenticated,
  updateProject: isProjectOwner,
  deleteProject: isProjectOwner,
};
