import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { isProjectOwner } from '../rules/project';
import { isAuthenticated } from '../rules/user';
import { Context } from '../types';
import {
  getUserId,
  requiredStringArg,
  selectPrisma,
  optionalStringArg,
  requiredIdArg,
  createSlug,
} from '../utils';
import { createRichText, updateRichText } from './RichText';

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

export const projectMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
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
        description: { create: createRichText(description) },
        slug: createSlug(name)!,
        owner: { connect: { id } },
        category: { connect: { id: categoryId } },
        imageUrl: '',
      });
      return project;
    },
  });

  t.field('updateProject', {
    type: 'Project',
    args: {
      id: requiredIdArg({
        description: 'ID of the **Project** to be updated.',
      }),
      name: requiredStringArg({ description: 'New name of the project.' }),
      description: optionalStringArg({
        description: 'New Rich Text description of the **Project**',
        default: '',
      }),
    },
    resolve: async (_, { id, name, description }, ctx: Context) => {
      const project = await ctx.prisma.updateProject({
        where: {
          id,
        },
        data: {
          name,
          description: updateRichText(description),
          slug: createSlug(name),
          imageUrl: '',
        },
      });
      return project;
    },
  });
};

export const projectPrismaQueries = selectPrisma<'Query'>([
  'project',
  'projects',
  'projectsConnection',
]);

export const projectPrismaMutations = selectPrisma<'Mutation'>([
  'deleteProject',
]);

export const projectMutationPermissions = {
  createProject: isAuthenticated,
  updateProject: isProjectOwner,
  deleteProject: isProjectOwner,
};
