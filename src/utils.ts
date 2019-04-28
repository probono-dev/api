import { verify } from 'jsonwebtoken';
import {
  idArg,
  NexusArgDef,
  ObjectDefinitionBlock,
  ScalarArgConfig,
  stringArg,
} from 'nexus/dist/core';
import { Context } from './types';

export const APP_SECRET = 'appsecret321';

export const throwIf = (condition: boolean, message: string) => {
  if (condition) {
    throw new Error(message);
  }
};

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

export function getUser(context: Context) {
  const id = getUserId(context);
  return context.prisma.user({ id });
}

export type Definition<T extends string> = (
  t: ObjectDefinitionBlock<T>,
) => void;

export function registerDefinitions<T extends string>(
  t: ObjectDefinitionBlock<T>,
  ...defintions: Array<Definition<T>>
) {
  defintions.forEach(definition => definition(t));
}

const requiredArg = <T>(
  arg: (options?: ScalarArgConfig<T>) => NexusArgDef<any>,
) => (options?: ScalarArgConfig<T>) =>
  arg({ ...options, required: true });

const optionalArg = <T>(
  arg: (options?: ScalarArgConfig<T>) => NexusArgDef<any>,
) => (options?: ScalarArgConfig<T>) =>
  arg({ ...options, required: false });

export const requiredStringArg = requiredArg(stringArg);

export const optionalStringArg = optionalArg(stringArg);

export const requiredIdArg = requiredArg(idArg);
