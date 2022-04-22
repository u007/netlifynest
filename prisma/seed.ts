import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log('Seeding...');
  await prisma.role.createMany({
    data: [
      {
        name: 'user',
        ownerId: '',
      },
      {
        name: 'superadmin',
        ownerId: '',
      },
      {
        name: 'admin',
        ownerId: '',
      },
      {
        name: 'supervisor',
        ownerId: '',
      },
      {
        name: 'promoter',
        ownerId: '',
      },
    ],
  });

  const admin = await prisma.user.create({
    data: {
      email: 'sup1@adsperianx.com.my',
      firstname: 'MrMs',
      lastname: 'Admin',
      password: process.env.SUPERPASS,
      roles: ['superadmin'],
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      roles: ['promoter'],
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      roles: ['admin'],
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
