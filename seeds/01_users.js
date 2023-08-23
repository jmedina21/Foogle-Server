/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      name: 'Patrick McCullough',
      email: 'patmc@gmail.com',
      password: 'pat123',
    },
    {
      id: 2,
      name: 'Joseph Young',
      email: 'jyoung@yahoo.com',
      password: 'foreveryoung',
    },
    {
      id: 3,
      name: 'Pablo Medina',
      email: 'pmedina@gmail.com',
      password: 'jpmm21',
    }
  ]);
};