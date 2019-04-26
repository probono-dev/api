import { ObjectDefinitionBlock } from 'nexus/dist/core';
import { getUser } from '../../utils';

export default (t: ObjectDefinitionBlock<'Query'>) => {
  t.field('me', {
    type: 'User',
    resolve: async (parent, args, ctx) => {
      return await getUser(ctx);
    },
  });
};
