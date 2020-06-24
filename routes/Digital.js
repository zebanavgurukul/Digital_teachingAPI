const express = require("express");
const Digital = express();
const DigitalDB   = require("../model/DigitalDB")

// 1 2
Digital.post('/insert',(req,res) => {
    var updata = {
        Teacher: req.body.Teacher,
        subject: req.body.subject
    }
    DigitalDB.insert_data(updata)
    .then(() => {
        res.send('insert..........')
    })
    .catch((err)=>{
        console.log(err);
    })
});

module.exports = Digital

