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

knex.schema.hasTable('Lessons').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('Lessons', (table) => {
            table.increments('ID')
            table.integer("Teaching_ID").unsigned()
            table.foreign("Teaching_ID").references("Teaching.ID")
            table.string('child')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});

knex.schema.hasTable('parent').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('parent', (table) => {
            table.increments('ID')
            table.integer("Lessons_ID").unsigned()
            table.foreign("Lessons_ID").references("Lessons.ID")
            table.string('child_moveTo_parent')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});