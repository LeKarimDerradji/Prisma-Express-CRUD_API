// import
const { PrismaClient } = require("@prisma/client");

// instanciation d'un nouveau prisma client
const prisma = new PrismaClient();

const main = async () => {
  /* const result = await prisma.users.create({
       data: {
           login: 'alice',
           firstName: 'Alice',
           lastName: 'Euler',
           email: 'alice@mail.com',
       },
    }) */

  const nbInserted = await prisma.users.createMany({
    data: [
      {
        login: "bob",
        firstName: "Bob",
        lastName: "Durac",
        email: "bob@mail.com",
      },
      {
        login: "charlie",
        firstName: "Charlie",
        lastName: "Turing",
        email: "charlie@mail.com",
      },
    ],
    // ignore les duplications
    skipDuplicates: true,
  });

  // Equivalent d'un SELECT * FROM users;
  const allUsers = await prisma.users.findMany();
  // Affichage du résultat
  // console.log(allUsers);

  // Conditional Select : 
  const users = await prisma.users.findMany({
    take: 1,
    orderBy: {
        id: 'desc',
    },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
    where: {
        id: {
            gt: 1,
        },
    },
  })

  console.log(users)
};

// Execution de la fonction main
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect();
  });
