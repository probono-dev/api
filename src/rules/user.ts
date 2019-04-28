import { rule } from 'graphql-shield';
import { Context } from '../types';
import { getUser, getUserId } from '../utils';

export const isAuthenticated = rule()((parent, args, context: Context) => {
  const userId = getUserId(context);
  return Boolean(userId);
});

export const isAdmin = rule()(async (parent, args, context: Context) =>{
  const user = await getUser(context);
  
})
