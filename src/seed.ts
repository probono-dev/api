import { prisma } from './generated/prisma-client';

async function main() {
  await prisma.createCategory({ name: 'Anti-bullying' });
  await prisma.createCategory({ name: 'Arts' });
  await prisma.createCategory({ name: 'Development' });
  await prisma.createCategory({ name: 'Environment' });
  await prisma.createCategory({ name: 'Education' });
  await prisma.createCategory({ name: 'Health' });
  await prisma.createCategory({ name: 'Homelessness' });
  await prisma.createCategory({ name: 'Information Technology' });
  await prisma.createCategory({ name: 'LGBT' });
  await prisma.createCategory({ name: 'Social' });
  await prisma.createCategory({ name: 'Sports' });
}

main();
