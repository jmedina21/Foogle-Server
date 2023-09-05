/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      email: 'patmc@gmail.com',
      password: 'pat123',
      verified: true,
    },
    {
      id: 2,
      email: 'jyoung@yahoo.com',
      password: 'foreveryoung',
      verified: true,
    },
    {
      id: 3,
      email: 'pmedina@gmail.com',
      password: 'jpmm21',
      verified: true,
    }
  ]);
};