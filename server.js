const express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json())

const Digital = require("./routes/Digital")
app.use("/Digital",Digital)

app.listen(7000, () => {
    console.log("server is listening 7000.........")
});