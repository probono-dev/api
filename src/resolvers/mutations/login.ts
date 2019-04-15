import { stringArg } from 'nexus/dist';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { APP_SECRET } from '../../utils';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('login', {
    type: 'AuthPayload',
    args: {
      email: stringArg(),
      password: stringArg(),
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
