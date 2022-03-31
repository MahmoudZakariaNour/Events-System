const express = require("express");

const body_parser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();

const authRouter = require("./Routers/AuthenticationRouter");
const spkrRouter = require("./Routers/SpeakersRouter");
const stdnRouter = require("./Routers/StudentsRouter");
const evntRouter = require("./Routers/EventsRouter");

// Connect To Database
mongoose.connect("mongodb://localhost:27017/IOTEventsDB")
    .then(() => {
        console.log("Connected to DB.....");
        //Start Server
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server Up On Port #${process.env.PORT} At ${new Date()} \nListening...`);
        });//listen

    })
    .catch(error => {
        console.log("Can't Connect To Database:" + error);

    })

app.use(cors())
app.use(body_parser.json());


app.use(authRouter);
app.use(spkrRouter);
app.use(stdnRouter);
app.use(evntRouter);
//Not Found
app.use((req, res) => {
    // console.log(req,res);
    res.status(404).send("Page is Not Found");
});


//Error
app.use((err, req, res, nxt) => {
    console.log(err)
    res.status(500).send("Error -> " + err);
})