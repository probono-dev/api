import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { APP_SECRET, requiredStringArg } from '../../utils';

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
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
      if (!user) {
        throw new Error(`No user found for email: ${email}`);
      }
      const passwordValid = await compare(password, user.password);
      if (!passwordValid) {
        throw new Error('Invalid password');
      }
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
  });
};
