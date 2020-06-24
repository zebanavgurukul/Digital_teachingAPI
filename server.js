const express = require('express');
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const Digital = require("./routes/Digital")
app.use("/Digital",Digital)

app.listen(6000, () => {
    console.log("server is listening 6000.........")
});