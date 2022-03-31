const mongoose = require("mongoose");
const Speaker = require("./../Models/SpeakerModel.js")
//NodeJS-MongoDB Driver 
// const Speaker = mongoose.model("speakers");                  //Speakers Schema
const { validationResult } = require("express-validator");      //Input Validator
const bcrypt = require('bcryptjs');                             //En/Decrypt Tool
var validator = require("email-validator");                     //Email Validator

//(POST)Add New Speaker
exports.addSpeaker = (req, res, nxt) => {
    console.log(`Registering new Speaker With Name: ${req.body.name} with Role: ${req.role}.`);
    let result = validationResult(req);
    if (!result.isEmpty()) {
        let errMsgs = result.array().reduce((conc, err) => conc + err.msg + ".\n", "Validation Result Errors: \n")
        let errObj = new Error(errMsgs);
        errObj.status = 422;
        throw errObj;
    }
    if (!validator.validate(req.body.email)) {
        //Email format not valid
        let errMsgs = `${req.body.email} is not an Email valid format.`
        let errObj = new Error(errMsgs);
        errObj.status = 423;
        throw errObj;
    }

    //Encrypt password before adding user
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let speakerObject = new Speaker({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                image: req.body.imageURL
            });
            speakerObject.save()
                .then((data) => {
                    console.log(`Speaker Added ${data}`);
                    res.status(201).json({ message: "Speaker Added" });

                })
                .catch(err => {
                    nxt(err);
                })
        }).catch(err => {
            nxt(`Failed To Encrypt Password With ${err}`);

        });
}// End of POST

//(GET) Get Speaker/s
exports.getSpeaker = (req, res, nxt) => {
    // If the optional id param is givin Then GetThatSpeaker
    console.log(`Getting Speaker With Name: ${req.body.name} with Role: ${req.role}.`);
    let speakerId = req.params.id || req.body.id;

    if (req.role != "admin") {
        // is not an admin
        if (req.role != "speaker" || req.id != speakerId) {
            // is not an speaker nor admin
            nxt(new Error(`Not Speaker getting Speaker`));
        }
    }

    if (req.params.id || req.body.id) {
        // console.log(req);
        Speaker.find({ _id: speakerId })
            .then(data => {
                res.status(200).json({ message: "Selected Speaker", data });
            })
            .catch(err => nxt(err));

    } else {
        //GetAllSpeakers
        Speaker.find({})
            .then(data => {
                res.status(200).json({ message: "List Of Speakers", data });
            })
            .catch(err => nxt(err));

    }
}//End of GET

//(DEL) Delete User/s
exports.deleteSpeaker = (req, res, nxt) => {
    // console.log(req.params);
    if (req.role != "admin") {
        // is not an admin

        nxt(new Error(`Not admin deleting`));
    }

    if (req.params.id || req.body.id) {
        let speakerId = req.params.id || req.body.id;

        console.log("Deleting Speaker With ID: " + speakerId);

        Speaker.deleteOne({ _id: speakerId })
            .then(data => {
                if (data.deletedCount > 0)
                    console.log("Deleted Speaker With ID: " + speakerId);
                res.status(200).json({ message: "Deleted Speaker", data });

            })
            .catch(err => {
                nxt(`Failed To Delete User With ${err}`);

            });
    } else {
        if (req.body.admin && req.body.admin == "admin") {
            console.log("Cleaning Speakers");
            Speaker.deleteMany({})
                .then(data => {
                    console.log("Deleted All Speakers");
                    res.status(200).json({ message: "All Speaker Deleted", data });

                })
                .catch(err => {
                    nxt(`Failed To Delete All User With ${err}`);

                });
        } else {
            res.status(400).json({ message: "cant delete user without Id" });
        }
    }
}// End of DEL

//(PUT) Update Speaker Data
exports.updateSpeaker = (req, res) => {
    let speakerId = req.params.id || req.body.id;

    if (req.role != "admin") {
        // is not an admin
        if (req.role != "speaker" || req.id != speakerId) {
            // is not an speaker nor admin
            nxt(new Error(`Not Speaker updating Speaker`));
        }
    }
    if (speakerId) {
        Speaker.findById(speakerId)
            .then(data => {
                if (data == null) throw new Error("speaker is not found");
                if (req.body.name) data.name = req.body.name;
                if (req.body.email) data.name = req.body.email;
                if (req.body.password) data.name = req.body.password;
                if (req.body.image) data.name = req.body.image;
                return data.save();

            })
            .then(data => {
                console.log(`Speaker Updated\n${data}`);
                response.status(200).json({ message: "update speaker" });

            })
            .catch(error => next(error));

    } else {
        res.status(400).json({ message: "cant update user without Id" });
    }
}
