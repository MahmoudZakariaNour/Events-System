const express = require("express");

const body_parser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')
const app = express();
const idAutoInc = require("id-auto-increment");

const authRouter = require("./Routers/AuthenticationRouter");
const spkrRouter = require("./Routers/SpeakersRouter");
const stdnRouter = require("./Routers/StudentsRouter");
const evntRouter = require("./Routers/EventsRouter");

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Connect To Database
mongoose.connect(process.env.DbUrl)
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
const storage = multer.diskStorage({
    // defining the path of images
    destination: (request, file, callback) => {
        callback(null, (__dirname + "/uploads"));
    },
    // making the image filename by joining the date and file name
    filename: (req, file, callback) => {
        idAutoInc()
            .then(function (id) {
                req.body.ImgUrl = id + "" + file.originalname.match(/\.[0-9a-z]+$/i);
                callback(null, req.body.ImgUrl);

            }).catch((err) => {

            });
    },
});
// size limiting for image
const limits = { fileSize: 1000000 };
// only accept these types of images jpg, jpeg, png
const fileFilter = (request, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png")
        callback(null, true);
};
app.use(cors())
app.use(body_parser.json());

app.use(multer({ storage, limits, fileFilter }).single("image"));


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
    console.log("Statuts:" + err.status + " " + err)
    res.status(500).send("" + err);
})