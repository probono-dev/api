import { stringArg } from 'nexus/dist';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { APP_SECRET } from '../../utils';
import { ObjectDefinitionBlock } from 'nexus/dist/core';

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('signup', {
    type: 'AuthPayload',
    args: {
      name: stringArg({ nullable: true }),
      email: stringArg(),
      password: stringArg(),
    },
    resolve: async (parent, { name, email, password }, ctx) => {
      const hashedPassword = await hash(password, 10);
      const user = await ctx.prisma.createUser({
        name,
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
