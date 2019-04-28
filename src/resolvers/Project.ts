import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import * as slug from 'slug';
import { isProjectOwner } from '../rules/project';
import { isAuthenticated } from '../rules/user';
import { Context } from '../types';
import { getUserId, requiredStringArg } from '../utils';

export const Project = prismaObjectType({
  name: 'Project',
  definition(t) {
    t.prismaFields([
      'id',
      'name',
      'slug',
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
      name: requiredStringArg(),
      description: requiredStringArg(),
      categoryId: requiredStringArg(),
    },
    resolve: async (_, { name, description, categoryId }, ctx: Context) => {
      const id = getUserId(ctx);
      const project = await ctx.prisma.createProject({
        name,
        description,
        slug: slug(name),
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
