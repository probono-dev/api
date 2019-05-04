import { rule } from 'graphql-shield';

import { getUserId } from '../utils';
import { Context } from '../types';

export const isOrganisationOwner = rule()(
  async (parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.organisation({ id }).owner();
    return userId === author.id;
  },
);
