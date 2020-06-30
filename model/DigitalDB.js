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

// 7
let moveToCart_ID = (ID) => {
    return knex('Lessons').where("ID",ID)
};

let moveToCart = (updataData) => {
    return knex('parent').insert(updataData)
};

let moveToCartdel = (ID) => {
    return knex('Lessons').where('Lessons.ID',ID).del()
};

// 8
let Search = (search_value) => {
    return knex.select('*')
    .from('Teaching')
    .where('Teaching.subject','like',  '%' +search_value+ '%')
};

let subject = (subject) => {
    return knex.select('*').from('Teaching').havingIn('Teaching.subject',subject)
};

let get_Teaching_ID = (Teaching_ID) => {
    return knex.select('*').from('Lessons').where('Lessons.Teaching_ID',Teaching_ID)
};

// 9
let Lessonsget = (ID) => {
    return knex.select('*').from('Lessons').where('Lessons.ID',ID)
}

let insert_children = (updata) => {
    return knex('child_to_children').insert(updata)
};

// 10
let Search_child = (search_value) => {
    return knex.select('*')
    .from('Lessons')
    .where('Lessons.child','like',  '%' +search_value+ '%')
};

let childdata = (subject) => {
    return knex.select('*').from('Lessons').havingIn('Lessons.child',subject)
};

let get_child_ID = (Lessons_ID) => {
    return knex.select('*').from('child_to_children').where('child_to_children.Lessons_ID',Lessons_ID)
};

// 11
let child_to_children_ID = (ID) => {
    return knex.select('*').from('child_to_children').where('child_to_children.ID',ID)
};

let get_children_child_ID = (ID) => {
    return knex.select('*').from('child_to_children').where('child_to_children.ID',ID)
};

module.exports = {insert_data,getdata,insert_Lessons,Delete,root_node,get_Data,moveToCart_ID,moveToCart,moveToCartdel,Search,subject,get_Teaching_ID,Lessonsget,insert_children,Search_child,childdata,get_child_ID,child_to_children_ID,get_children_child_ID}