const knex = require("../connection"); 

// 1 2
let insert_data = (updata) => {
    return knex('Teaching').insert(updata)
};

module.exports = {insert_data}