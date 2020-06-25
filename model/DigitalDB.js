const knex = require("../connection"); 

// 1
let insert_data = (updata) => {
    return knex('Teaching').insert(updata)
};

// 2
let getdata = (ID) => {
    return knex.select('*').from('Teaching').where('Teaching.ID',ID)
}

let insert_Lessons = (updata) => {
    return knex('Lessons').insert(updata)
};

module.exports = {insert_data,getdata,insert_Lessons}