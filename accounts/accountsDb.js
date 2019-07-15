const db = require('../data/dbConfig');

module.exports = {
   get,
   // getById,
   // insert,
   // update,
   // remove,
};

function get() {
   return db('accounts');
}