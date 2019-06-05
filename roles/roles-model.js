const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/rolex.db3',
  },
  useNullAsDefault: true,
};

const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('roles');
}

function findById(id) {
  return db('roles')
    .where({ id })
    .first();
}

function add(role) {
  return db('role').insert(role);
}

function update(id, changes) {
  return db('roles')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('roles')
    .where({ id })
    .del();
}
