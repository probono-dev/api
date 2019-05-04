import { prismaObjectType } from 'nexus-prisma';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import {
  selectPrisma,
  requiredStringArg,
  APP_SECRET,
  throwIf,
  optionalStringArg,
  getUser,
} from '../utils';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  regexp,
  EMAIL,
  minLength,
  combine,
  maxLength,
  optional,
} from '../validate';
import { isAuthenticated, isAdmin } from '../rules/user';

const validateEmail = regexp(EMAIL);

const validatePassword = minLength(8);

const validateName = optional(combine(minLength(3), maxLength(50)));

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
      'organisation',
      'tasks',
    ]);
  },
});

export const userMutations = (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('login', {
    type: 'AuthPayload',
    args: {
      email: requiredStringArg({
        description: 'E-mail address of a registered user.',
      }),
      password: requiredStringArg({
        description: 'Password matching the e-mail address.',
      }),
    },
    resolve: async (parent, { email, password }, context) => {
      const user = await context.prisma.user({ email });
      throwIf(!user || !user.password, `No user found for email: ${email}`);
      const passwordValid = await compare(password, user.password!);
      throwIf(!passwordValid, 'Invalid password');
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
  });

  t.field('signup', {
    type: 'AuthPayload',
    args: {
      name: optionalStringArg({
        description:
          'Full name of the user. Must be at least **3** and at most **50** characters in length.',
      }),
      email: requiredStringArg({
        description: 'Valid e-mail address of the user.',
      }),
      password: requiredStringArg({
        description:
          'A secure password used for logging in. Must be at least **8** characters in length.',
      }),
    },
    resolve: async (parent, { name, email, password }, ctx) => {
      const hashedPassword = await hash(password, 10);
      validateEmail(email);
      validatePassword(password);
      validateName(name);
      const user = await ctx.prisma.createUser({
        name: name || undefined,
        email,
        password: hashedPassword,
      });
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
  });
};

export const userQueries = (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('me', {
    type: 'User',
    resolve: async (parent, args, ctx) => {
      return getUser(ctx);
    },
  });
};

export const userPrismaMutations = selectPrisma<'Mutation'>([
  'updateUser',
  'deleteUser',
]);

export const userPrismaQueries = selectPrisma<'Query'>([
  'user',
  'users',
  'usersConnection',
]);

export const userMutationPermissions = {
  updateUser: isAdmin,
  deleteUser: isAdmin,
};

export const userQueryPermissions = {
  me: isAuthenticated,
};
