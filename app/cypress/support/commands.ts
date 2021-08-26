import '@testing-library/cypress/add-commands';
import axios from 'axios';

declare global {
  namespace Cypress {
    interface Chainable {
      seedTable: typeof seedTable;
      clearTable: typeof clearTable;
    }
  }
}

interface SeedTableOptions<T> {
  tableName: string;
  data: Array<T>;
};

function seedTable<T>(options: SeedTableOptions<T>) {
  cy.log(`Seeding table ${options.tableName}`, options.data);
  cy.wrap(axios.post('http://descomplica.server.local/api/seed', options), { log: false, timeout: 15000 });
}

function clearTable(tableName: string) {
  cy.log(`Clearing table ${tableName}`);
  cy.wrap(axios.post('http://descomplica.server.local/api/clear', { tableName }), { log: false, timeout: 15000 });
};

Cypress.Commands.add('seedTable', seedTable);
Cypress.Commands.add('clearTable', clearTable);
