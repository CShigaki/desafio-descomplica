## Goals

### Requisitos funcionais
- Desenvolver um serviço com API GraphQL e uma base de dados de alunos contendo: nome, CPF e e-mail. A API deve listar os alunos, filtrando por quaisquer dos campos, retornando todos, caso nenhum seja informado. ✅
- Desenvolver uma UI em React que permita realizar consultas a esse serviço, consumindo e exibindo os dados retornados por ele. ✅

### Requisitos não funcionais
- Ser escrito em JavaScript ou TypeScript; ✅
- Ter documentação: instruções sobre como devemos rodar seu projeto, por exemplo, são indispensáveis. ✅
- Tanto o serviço no backend quanto a UI serem servidos em containers Docker; ✅
- O banco de dados deve ser implementado num SGBD, como MySQL, Postgres ou similar. ✅

### Extras
- Realizar commits específicos e detalhados; ✅/❎?
- Escrever testes automatizados; ✅
- Acrescentar algum tipo de cache para a consulta dos dados (no frontend, no backend, ou nos dois); ✅ - @apollo/client handles that with in memory caching
- Acrescentar um proxy reverso redirecionando as requisições que chegam para o serviço; ✅
- Disponibilizar uma solução completa para o deploy da aplicação (helm chart,
docker-compose).

## Assumptions
- It's not necessary to implement an authentication system

## Technical Decisions

### Front End
- Some components are not tested as simply testing component rendering wouldn't be much of an use in this exercise.
- Complex components like `StudentsList` are only tested via integration testing as it would take too long to test it with jest.
- I figured it is important for this exercise to also evaluate my CSS and HTML knowledge, so other than `TablePagination`, no other styled componend was used from material-ui.
- Styled compoents was chosen over sass because it eliminates the addition of conditional classes in your code, eliminates css conflicts, is easier to read and it's a personal preference.
- Components are separated between generic components and components specific to a context. `StudentCard`, for instance, is only used in the `/students` page and therefore should be in the Students container.

### Back End
- This was my first contact with GraphQL and I had no idea how to structure a project with it. The folder structure is mainly based on a mix of two structures suggested [here](https://shammelburg.medium.com/folder-schema-structure-with-graphql-1c8c0ad10717) and [here](https://javascript.plainenglish.io/writing-a-node-js-graphql-backend-that-actually-scales-a-complete-guide-part-1-setup-cddceae25bdc).
- I chose jest as a testing tool because I'm already familiarized with it and time was short.
- I didn't see much point in testing things other than `student.resolvers.ts`, since the test would cover most of the application already.

## Row to run

### Requirements
- `yarn` or `npm` (I used yarn)
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [node v12+](https://github.com/nvm-sh/nvm)
- The addition of a couple lines to your hosts file (unless you want to access it through localhost)
```
127.0.0.1 descomplica.app.local
127.0.0.1 descomplica.server.local
```

### Starting up
Navigate to the root folder of this project and run `docker-compose up`.

After all services finish booting up you can access the application on

`http://descomplica.app.local` for the front-end

`http://descomplica.server.local/api/data` for the graphql playground.

A migration and some fixtures have already been created and are executed automatically when the server container starts. If you want more data to test the pagination run the scenario `'paginates results'` using cypress.

### Running tests
I added two workflows both for the server and the app that will run using github actions whenever a change is made to app or server. If a file changes in the `app` folder it will only run tests from the app folder and vice-versa. Sadly, since the cypress tests depend on some containers being up it would be a bit harder to create the workflow, so I left it out.

#### Server
You can run the tests by acessing the `server` folder and running `yarn test` or `yarn test:watch`

#### Client
- Unit
  - cd into the `app` folder and run `yarn test`

- Integration (**ALL CONTAINERS MUST BE UP**)
  - cd into the `app` folder and run `yarn test:integration` or `yarn test:integration:open` if you wish to see the interface as the tests run