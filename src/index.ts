import './env';
import { GraphQLServer } from 'graphql-yoga';
import { makePrismaSchema } from 'nexus-prisma';
import * as path from 'path';
import datamodelInfo from './generated/nexus-prisma';
import { prisma } from './generated/prisma-client';
import { permissions } from './permissions';
import * as allTypes from './resolver';
import { isEnv } from './utils';

const outputs = isEnv('production')
  ? false
  : {
      schema: path.join(__dirname, './generated/schema.graphql'),
      typegen: path.join(__dirname, './generated/nexus.ts'),
    };

const typegenAutoConfig = isEnv('production')
  ? undefined
  : {
      sources: [
        {
          source: path.join(__dirname, './types.ts'),
          alias: 'types',
        },
      ],
      contextType: 'types.Context',
    };

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: allTypes,

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma,
  },

  // Specify where Nexus should put the generated files
  outputs,

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig,
});

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma,
    };
  },
});

/* tslint:disable no-console */
server.start(() =>
  console.log(`🚀 Server ready in mode: ${process.env.NODE_ENV}`),
);
