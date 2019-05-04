import { hash } from 'bcrypt';
import * as slug from 'slug';
import { prisma } from './generated/prisma-client';
import { isEnv } from './utils';

const { PROD_ADMIN_PASSWORD } = process.env;

const dev = isEnv('development');
const test = isEnv('test');
const production = isEnv('production');

const createAccount = async (
  name: string,
  password: string,
  email: string,
  admin = false,
  verified = true,
) => {
  const hashedPassword = await hash(password, 10);
  await prisma.createUser({
    name,
    password: hashedPassword,
    email,
    admin,
    verified,
  });
};

async function main() {
  // Add all the categories that don't yet exist
  const addedCategories = await prisma.categories();
  const names = addedCategories.map(({ name }) => name);
  const allCategories = [
    'Anti-bullying',
    'Arts',
    'Development',
    'Environment',
    'Education',
    'Health',
    'Homelessness',
    'Information Technology',
    'LGBT',
    'Social',
    'Sports',
  ];
  const toBeAdded = allCategories.filter(name => !names.includes(name));
  Promise.all(
    toBeAdded.map(name => {
      prisma.createCategory({
        name,
        slug: slug(name, { lower: true }),
        approved: true,
      });
    }),
  );

  // NOTE(danielkov): Creates an admin account in `dev` mode
  // to help developers test admin features without having to tinker
  // with Prisma manually
  if (dev) {
    await createAccount('Dev Admin', 'dev-admin', 'dev@admin.com', true);
  }
  // NOTE(danielkov): sets up 3 types of accounts in test mode
  if (test) {
    await Promise.all([
      createAccount('Test Admin', 'test-admin', 'test@admin.com', true),
      createAccount('Test User', 'test-user', 'test@user.com'),
      createAccount('Test New', 'test-new', 'test@new.com', false, false),
    ]);
  }
  // NOTE(danielkov): Creates the initial admin account on actual deployment
  if (production) {
    await createAccount(
      'Professor Bonovich',
      PROD_ADMIN_PASSWORD,
      'admin@probono.dev',
      true,
    );
  }
}

/* tslint:disable no-console */
main().then(() => console.log('Seed complete'));
