import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { isAdmin, isAuthenticated } from '../rules/user';
import { Context } from '../types';
import {
  requiredIdArg,
  requiredStringArg,
  selectPrisma,
  optionalStringArg,
  createSlug,
} from '../utils';
import { createRichText, updateRichText } from './RichText';
import { isOrganisationOwner } from '../rules/organisation';

export const Organisation = prismaObjectType({
  name: 'Organisation',
  definition(t) {
    t.prismaFields(['*']);
  },
});

const NAME_DESCRIPTION = 'Name of the Organisation.';
const DESCRIPTION_DESCRIPTION = 'Name of the Organisation.';
const ID_DESCRIPTION = 'Unique identifier of the Organisation.';
const USERID_DESCRIPTION = 'Unique identifier of the User.';

export const organisationMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('createOrganisation', {
    type: 'Organisation',
    args: {
      name: requiredStringArg({ description: NAME_DESCRIPTION }),
      description: optionalStringArg({
        description: DESCRIPTION_DESCRIPTION,
        default: '',
      }),
    },
    resolve: async (_, { name, description }, ctx: Context) => {
      return ctx.prisma.createOrganisation({
        name,
        slug: createSlug(name)!,
        approved: false,
        description: { create: createRichText(description || '') },
      });
    },
  });

  t.field('editOrganisation', {
    type: 'Organisation',
    args: {
      id: requiredIdArg({ description: ID_DESCRIPTION }),
      name: optionalStringArg({ description: NAME_DESCRIPTION }),
      description: optionalStringArg({
        description: DESCRIPTION_DESCRIPTION,
      }),
      ownerId: requiredIdArg({ description: USERID_DESCRIPTION }),
    },
    resolve: async (_, { name, description, id, ownerId }, ctx: Context) => {
      return ctx.prisma.updateOrganisation({
        where: { id },
        data: {
          name: name || undefined,
          slug: createSlug(name),
          approved: false,
          description: updateRichText(description),
          owner: { connect: { id: ownerId! } },
        },
      });
    },
  });

  t.field('approveOrganisation', {
    type: 'Organisation',
    args: {
      id: requiredIdArg({
        description: ID_DESCRIPTION,
      }),
    },
    resolve: async (_, { id }, ctx: Context) => {
      return ctx.prisma.updateOrganisation({
        data: { approved: true },
        where: { id },
      });
    },
  });
};

export const organisationPrismaQueries = selectPrisma<'Query'>([
  'organisation',
  'organisations',
  'organisationsConnection',
]);

export const organisationPrismaMutations = selectPrisma<'Mutation'>([
  'deleteOrganisation',
]);

export const organisationMutationPermissions = {
  createOrganisation: isAuthenticated,
  approveOrganisation: isAdmin,
  deleteOrganisation: isAdmin,
  editOrganisation: isOrganisationOwner,
};
