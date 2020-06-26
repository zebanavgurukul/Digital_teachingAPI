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
Digital.get('/rootnode/:ID', (req,res) => {
    var ID = req.params.ID
    var data = DigitalDB.root_node(ID)
    data.then((Response)=>{
       res.json(Response)
    }).catch((err)=>{
       console.log(err)
       res.send(err)
    })
});

// 5
Digital.get('/getLessons', (req,res) => {
    DigitalDB.get_Data()
    .then((Res) => {
        res.send(Res)
    }).catch((err) => {
        res.send(err)
    })
});

// 6

// 7
Digital.get("/moveToCart/:ID",(req,res) => {
    var ID = req.params.ID;
    var getData = DigitalDB.moveToCart_ID(ID)
    getData.then((data) => {
    let updataData = {
       ID : data[0]['ID'],
       Lessons_ID : data[0]['Teaching_ID'],
       child_moveTo_parent : data[0]['child']
    }
    var inserted = DigitalDB.moveToCart(updataData)
    inserted.then(() => {
            var deleted = DigitalDB.moveToCartdel(ID)
            deleted.then(() => {
                res.send("Deleted...")
            })
        })
    }).catch((err)=>{
       res.send(err)
    })
});

// 
Digital.get('/search/:search_value', (req,res) => {
    var search_value = req.params.search_value
    var data = DigitalDB.Search(search_value)
    data.then((Response)=>{
        var subject = Response[0]['subject']
        var ID = Response[0]['ID']
        if ( subject == "Math"){
            DigitalDB.get_Teaching_ID(ID)
            .then((data) => {
            list = []
            for (let i = 0; i < data.length; i++){
                var child = data[i]['child']
                if(child != 0){
                    list.push(child)
                } 
            }
            res.send(list)
            })
        }
    }).catch((err)=>{
       console.log(err)
       res.send(err)
    })
});

module.exports = Digital

