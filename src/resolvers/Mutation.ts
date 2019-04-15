import { mutationType } from 'nexus';
import signup from './mutations/signup';
import login from './mutations/login';

export const Mutation = mutationType({
  definition(t) {
    signup(t);
    login(t);
  },
});
