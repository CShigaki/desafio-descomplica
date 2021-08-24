import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("student").del();
    // Inserts seed entries
    await knex("student").insert([
        {
            id: '0ba004dd-083c-4a15-80c6-fc0c5684125b',
            name: 'Celso',
            email: 'celso.shigaki@gmail.com',
            cpf: '14709071004',
        },
        {
            id: '741e6863-a8a6-4814-a592-f97ba85f70a1',
            name: 'Ana',
            email: 'ana@gmail.com',
            cpf: '05445279090',
        },
        {
            id: 'd0965fa0-afc8-4c9d-9289-94db603acda1',
            cpf: '67156623044',
            name: 'Joaquim',
            email: 'joaquim@gmail.com',
        },
        {
            id: '38d41d44-7eff-4aae-ac54-ad9190d73462',
            cpf: '21803970030',
            name: 'André',
            email: 'andre@gmail.com',
        },
        {
            id: '245cc753-7022-4c69-86c6-306026529b17',
            cpf: '77253822080',
            name: 'Juliana',
            email: 'juliana@gmail.com',
        },
    ]);
};
