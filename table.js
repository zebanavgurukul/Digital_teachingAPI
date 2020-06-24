const knex = require("./connection"); 

module.exports = knex;

knex.schema.hasTable('Teaching').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('Teaching', (table) => {
            table.increments('ID')
            table.string('Teacher')
            table.string('subject').unique();
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});