import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();
const identities = await prisma.userIdentity.findMany({ include: { user: true } });
console.log(JSON.stringify(identities, null, 2));
await prisma.$disconnect();