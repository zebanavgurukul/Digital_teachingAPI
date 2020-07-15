const express = require("express");
const Digital = express();
const DigitalDB   = require("../model/DigitalDB")

// 1 Create a parent
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

// 2 Create a child
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

// 3 Delete children
Digital.delete('/delete/:search_value',(req,res) => {
    var search_value = req.params.search_value
    DigitalDB.Delete(search_value)
    .then(() => {
        res.send('......delete......')
    }).catch((err) => {
        res.send(err)
    })
});

// 4 Get by ID
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

// 5 Get by All data
Digital.get('/getLessons', (req,res) => {
    DigitalDB.get_Data()
    .then((Res) => {
        res.send(Res)
    }).catch((err) => {
        res.send(err)
    })
});

// 7 Move a child from another parent
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

// 8 Search in the tree and get data
Digital.get('/search/:search_value', (req,res) => {

    var search_value = req.params.search_value
    var data = DigitalDB.Search(search_value)
    data.then((Response)=>{
        var subject = Response[0]['subject']
        var ID = Response[0]['ID']
        DigitalDB.subject(search_value)
        .then((Res) => {
            var subject_search = Res[0]['subject']
            if ( subject == subject_search){
                DigitalDB.get_Teaching_ID(ID)
                .then((data) => {
                list = []
                for (let i = 0; i < data.length; i++){
                    var child = data[i]['child']
                    list.push(child)
                }
                console.log(list)
                res.send(list)
                }).catch((err) => {
                    res.send(err)
                })
            }
        })
    }).catch((err)=>{
       console.log(err)
       res.send(err)
    })
});

// 9 post data by ID and children
Digital.post('/insert/:ID',(req,res) => {
    var ID = req.params.ID
    DigitalDB.Lessonsget(ID)
    .then((data) => {
        var ID = data[0]['ID']
        var updata = {
            Lessons_ID: ID,
            children: req.body.children,
            children_child : req.body.children_child
        }
        DigitalDB.insert_children(updata)
        .then(() => {
            res.send('.....insert.....')
        })
        .catch((err)=>{
            console.log(err);
        })
    })
});

// 10 Search and get child
Digital.get('/searchchild/:search_value', (req,res) => {
    var search_value = req.params.search_value
    var data = DigitalDB.Search_child(search_value)
    data.then((Response)=>{
        var child = Response[0]['child']
        var ID = Response[0]['ID']
        DigitalDB.childdata(search_value)
        .then((Res) => {
            console.log(Res)
            var childsearch = Res[0]['child']
            if ( child == childsearch){
                DigitalDB.get_child_ID(ID)
                .then((data) => {
                list = []
                for (let i = 0; i < data.length; i++){
                    var children = data[i]['children']
                    list.push(children)
                }
                res.send(list)
                })
            }
        })
    }).catch((err)=>{
       console.log(err)
       res.send(err)
    })
});

// 11 Search and get child data to child data
Digital.get('/child_to_children/:ID',(req,res) => {
    var ID = req.params.ID
    DigitalDB.child_to_children_ID(ID)
    .then((data) => {
        var children_ID = data[0]['ID']
        if ( ID == children_ID){
            DigitalDB.get_children_child_ID(ID)
            .then((data) => {
            list = []
            for (let i = 0; i < data.length; i++){
                var children_child = data[i]['children_child']
                list.push(children_child)
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

