import { prisma } from './generated/prisma-client';
import * as slug from 'slug';

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
      console.log(`Adding category: ${name}`);
      prisma.createCategory({ name, slug: slug(name, { lower: true }), approved: true });
    }),
  );
}

main().then(() => console.log('Seed complete'));
