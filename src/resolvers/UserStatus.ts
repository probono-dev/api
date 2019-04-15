import { prismaEnumType } from 'nexus-prisma';

export const UserStatus = prismaEnumType({
  name: 'UserStatus',
  members: ['NEW', 'VERIFIED', 'INACTIVE'],
});
