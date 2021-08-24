import { PrismaClient } from '@prisma/client';

(async () => {
  const prismaClient = new PrismaClient();

  await prismaClient.aluno.create({
    data: {
      cpf: '90777399040',
      nome: 'Celso',
      email: 'celso.shigaki@gmail.com',
    }
  });

  console.log('created first');

  await prismaClient.aluno.create({
    data: {
      cpf: '19250993005',
      nome: 'Ana',
      email: 'ana@gmail.com',
    }
  });

  console.log('created second');

  await prismaClient.aluno.create({
    data: {
      cpf: '67156623044',
      nome: 'Joaquim',
      email: 'joaquim@gmail.com',
    }
  });

  console.log('created third');

  await prismaClient.aluno.create({
    data: {
      cpf: '21803970030',
      nome: 'André',
      email: 'andre@gmail.com',
    }
  });

  console.log('created fourth');

  await prismaClient.aluno.create({
    data: {
      cpf: '77253822080',
      nome: 'Juliana',
      email: 'juliana@gmail.com',
    }
  });

  console.log('created fifth');

  process.exit();
})();