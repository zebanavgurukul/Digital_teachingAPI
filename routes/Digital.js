const express = require("express");
const Digital = express();
const DigitalDB   = require("../model/DigitalDB")

// 1
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

// 2 
Digital.post('/Lessonsinsert/:ID',(req,res) => {
    let ID = req.params.ID
    DigitalDB.getdata(ID)
    .then((data) => {
        var Teaching_ID = data[0]['ID']
        var updata = {
            Teaching_ID: Teaching_ID,
            child: req.body.child
        }
        DigitalDB.insert_Lessons(updata)
        .then(() => {
            res.send('insert..........')
        })
        .catch((err)=>{
            console.log(err);
        })
    })
});

module.exports = Digital

