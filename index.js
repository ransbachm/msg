const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const User = require("./models/user");
const Message = require("./models/message");
const { exit } = require("process");

const urlString = process.env.CON_STRING;

mongoose.connect(urlString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("connected to db"))
    .catch(e =>{console.log("Could not connect do database\nCheck provided connection url"); exit(1)});

const app = express();

app.use(bodyParser.json())

app.post('/hello',function(req,res){
    console.log(req.body)
   res.send("");
});

app.post("/api/message", (req, res) => {

    console.log(req.body)

    let message = {
        msg : req.body.msg,
        creator : req.body.creator
    };


    if(message.msg == undefined || message.creator == undefined) {
        res.status(400);
        res.send("Request invalid")
        return;
    }

    Message.create(message,(err, user) => {
        if(err) {
            console.log(err);
            res.status(500);
            res.send("Internal Server Error");
            return;
        }
        res.redirect("/");
    })
});

app.get("/api/message", async (req, res) => {
    console.log("get");
    let messages = await Message.find({});
    res.status("200");
    res.json(messages);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/view/index.html"));
})
app.listen(8080);