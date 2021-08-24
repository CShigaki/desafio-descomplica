import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('student', (tableBuilder: Knex.TableBuilder) => {
    tableBuilder.string('id', 36).primary();
    tableBuilder.string('name');
    tableBuilder.string('email').unique();
    tableBuilder.string('cpf', 16).unique();
    tableBuilder.string('gravatar');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('student');
};
