import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import * as slug from 'slug';
import { isProjectOwner } from '../rules/project';
import { isAuthenticated } from '../rules/user';
import { Context } from '../types';
import {
  getUserId,
  requiredStringArg,
  selectPrisma,
  optionalStringArg,
  requiredIdArg,
} from '../utils';
import { createRichText } from './RichText';

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
        slug: slug(name),
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
      name: optionalStringArg({ description: 'New name of the project.' }),
      description: optionalStringArg({
        description: 'New Rich Text description of the **Project**',
      }),
    },
    resolve: async (_, { id, name, description }, ctx: Context) => {
      const newSlug = name ? slug(name) : undefined;
      const project = await ctx.prisma.updateProject({
        where: {
          id,
        },
        data: {
          name,
          description: {
            upsert: {
              create: createRichText(description),
              update: createRichText(description),
            },
          },
          slug: newSlug,
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
