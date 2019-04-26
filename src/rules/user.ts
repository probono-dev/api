import { rule } from 'graphql-shield';
import { getUserId, getUser } from '../utils';
import { Context } from '../types';

export const isAuthenticated = rule()((parent, args, context: Context) => {
  const userId = getUserId(context);
  return Boolean(userId);
});

export const isAdmin = rule()(async (parent, args, context: Context) =>{
  const user = await getUser(context);
  
})
