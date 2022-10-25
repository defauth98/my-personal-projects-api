import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      { name: 'js', id: 1 },
      { name: 'css', id: 5 },
      { name: 'html', id: 4 },
      { name: 'node', id: 7 },
      { name: 'react', id: 6 },
      { name: 'ts', id: 3 },
    ],
  });

  await prisma.user.create({
    data: {
      id: 1,
      email: 'neto.daniribeiro@gmail.com',
      password_hash:
        '$2b$10$VsWAbBlyXrbDic7DZ/NsOO4v53nbYrlXV6CboP.f2TAEoYiZA8cgi',
    },
  });

  await prisma.project.createMany({
    data: [
      {
        id: 8,
        description:
          'Tela de desenho usando pixels com uma paleta de cores aleatória',
        thumbnailPath:
          'https://personal-projects.defauth98.com/pixels-art-1c3762cd-54d4-4f10-ad02-c2c97808d0e2.png',
        gifPath: 'https://personal-projects.defauth98.com/pixels-art.gif',
        link: 'https://pixels-art.defauth98.com',
        repoLink: 'https://github.com/defauth98/pixels-art',
        createdAt: new Date('2022-05-11 11:39:15.653'),
        updatedAt: new Date('2022-10-10 12:32:31.221'),
        hidden: false,
        name: 'pixels-art',
        faviconLink:
          'https://pixels-art.defauth98.com/src/assets/pixels-art-logo.png',
        deleted: null,
      },
      {
        id: 16,
        description:
          'Plataforma web e mobile para alunos entrarem em contato com os professores, construído durante a NLW da Rocketseat. Mas com os desafios concluídos da versão 2.0.',
        thumbnailPath:
          'https://personal-projects.defauth98.com/pixels-art-1c3762cd-54d4-4f10-ad02-c2c97808d0e2.png',
        gifPath: 'https://personal-projects.defauth98.com/pixels-art.gif',
        link: 'https://proffy-deploy-frontend.netlify.app/',
        repoLink: 'https://github.com/defauth98/proffy',
        createdAt: new Date('2022-05-22 21:51:20.939'),
        updatedAt: new Date('2022-10-10 12:32:31.221'),
        hidden: false,
        name: 'proffy',
        faviconLink: 'https://proffy-deploy-frontend.netlify.app/favicon.ico',
        deleted: null,
      },
      {
        id: 17,
        description: 'App de lista de tarefas',
        thumbnailPath:
          'https://personal-projects.defauth98.com/pixels-art-1c3762cd-54d4-4f10-ad02-c2c97808d0e2.png',
        gifPath: 'https://personal-projects.defauth98.com/pixels-art.gif',
        link: 'https://todolist.defauth98.com/',
        repoLink: 'https://github.com/defauth98/todolist',
        createdAt: new Date('2022-05-23 00:14:21.854'),
        updatedAt: new Date('2022-10-10 12:32:31.221'),
        hidden: false,
        name: 'todolist',
        faviconLink: 'https://todolist.defauth98.com/images/favicon.png',
        deleted: null,
      },
      {
        id: 24,
        description:
          'Plataforma web e mobile para pessoas encontrarem orfanatos para visitarem, construído durante a NLW da Rocketseat. Mas com os desafios concluídos da versão 2.0.',
        thumbnailPath:
          'https://personal-projects.defauth98.com/pixels-art-1c3762cd-54d4-4f10-ad02-c2c97808d0e2.png',
        gifPath: 'https://personal-projects.defauth98.com/pixels-art.gif',
        repoLink: 'https://github.com/defauth98/happy',
        link: 'https://github.com/defauth98/happy',
        createdAt: new Date('2022-07-02 21:33:17.259'),
        updatedAt: new Date('2022-10-10 12:32:31.221'),
        hidden: false,
        name: 'happy',
        faviconLink: 'https://proffy-deploy-frontend.netlify.app/favicon.ico',
        deleted: null,
      },
      {
        id: 25,
        description: 'desc',
        thumbnailPath:
          'https://personal-projects.defauth98.com/pixels-art-1c3762cd-54d4-4f10-ad02-c2c97808d0e2.png',
        gifPath:
          'https://personal-projects.defauth98.com/ff4a62f2-f693-451b-8909-3349e93e7247.jpg',
        link: 'https://trello.com/b/zVJQBVIN/mppd',
        repoLink: 'https://trello.com/b/zVJQBVIN/mppd',
        createdAt: new Date('2022-08-13 18:17:57.696'),
        updatedAt: new Date('2022-10-10 12:32:31.221'),
        hidden: false,
        name: 'nome',
        faviconLink: 'https://trello.com/b/zVJQBVIN/mppd',
        deleted: new Date('2022-10-10 12:21:00.032'),
      },
    ],
  });

  await prisma.apiStatus.create({
    data: {
      link: 'https://trcd14tkph.execute-api.sa-east-1.amazonaws.com/dev/status',
      name: 'My personal projects API',
    },
  });

  await prisma.projectHasTags.createMany({
    data: [
      { id: 18, project_id: 24, tag_id: 7 },
      { id: 19, project_id: 24, tag_id: 6 },
      { id: 20, project_id: 24, tag_id: 3 },
      { id: 23, project_id: 8, tag_id: 5 },
      { id: 24, project_id: 8, tag_id: 4 },
      { id: 27, project_id: 8, tag_id: 1 },
      { id: 28, project_id: 16, tag_id: 3 },
      { id: 29, project_id: 16, tag_id: 6 },
      { id: 30, project_id: 16, tag_id: 7 },
      { id: 31, project_id: 25, tag_id: 5 },
      { id: 32, project_id: 25, tag_id: 4 },
      { id: 33, project_id: 25, tag_id: 1 },
      { id: 34, project_id: 25, tag_id: 7 },
      { id: 35, project_id: 25, tag_id: 3 },
      { id: 36, project_id: 25, tag_id: 6 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
