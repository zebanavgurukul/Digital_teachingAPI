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

// 3
let Delete = (search_value) => {
    return knex.select('*')
    .from('Lessons')
    .where('Lessons.child','like',  '%' +search_value+ '%').del()
};

// 4
var root_node = (ID) => {
    return knex("Teaching")
    .join('Lessons','Teaching.ID','=','Lessons.ID')
    .select("*")
    .where('Lessons.ID',ID)
};

// 5
let get_Data = () => {
    return knex.select('*').from('Lessons')
}

module.exports = {insert_data,getdata,insert_Lessons,Delete,root_node,get_Data}