import { stringArg } from 'nexus/dist';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { APP_SECRET, requiredStringArg, optionalStringArg } from '../../utils';
import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { regexp, EMAIL, minLength, combine, maxLength } from '../../validate';

const validateEmail = regexp(EMAIL);

const validatePassword = minLength(8);

const validateName = combine(minLength(3), maxLength(50));

export default (t: ObjectDefinitionBlock<'Mutation'>) => {
  t.field('signup', {
    type: 'AuthPayload',
    args: {
      name: optionalStringArg({
        description: 'Full name of the user. Must be at least **3** and at most **50** characters in length.',
      }),
      email: requiredStringArg({
        description: 'Valid e-mail address of the user.',
      }),
      password: requiredStringArg({
        description: 'A secure password used for logging in. Must be at least **8** characters in length.',
      }),
    },
    resolve: async (parent, { name, email, password }, ctx) => {
      const hashedPassword = await hash(password, 10);
      validateEmail(email);
      validatePassword(password);
      validateName(name);
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
