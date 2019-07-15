const db = require('../data/dbConfig');

module.exports = {
   get,
   getById,
   insert,
   update,
   remove,
};

function get() {
   return db('accounts');
}

function getById(id) {
   return db('accounts')
      .where({ id })
}

function insert(accounts) {
   return db('accounts')
      .insert(accounts)
      .then(ids => {
         return getById(ids[0]);
      });
}

function update(id, changes) {
   return db('accounts')
      .where({ id })
      .update(changes);
}

function remove(id) {
   return db('accounts')
      .where('id', id)
      .del()
}