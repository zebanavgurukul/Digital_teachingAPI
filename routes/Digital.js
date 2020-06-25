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

// 3
Digital.delete('/delete/:search_value',(req,res) => {
    var search_value = req.params.search_value
    DigitalDB.Delete(search_value)
    .then(() => {
        res.send('......delete......')
    }).catch((err) => {
        res.send(err)
    })
});

// 4
Digital.get('/getLessons', (req,res) => {
    DigitalDB.get_Data()
    .then((Res) => {
        res.send(Res)
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = Digital

