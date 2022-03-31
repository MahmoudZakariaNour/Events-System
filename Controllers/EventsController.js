const mongoose = require("mongoose");                           //NodeJS-MongoDB Driver 
const Event = require("./../Models/EventModel.js")              //Event Schema
const { validationResult } = require("express-validator");      //Input Validator
const bcrypt = require('bcryptjs');                             //En/Decrypt Tool
const validator = require("email-validator");                   //Email Validator


//(POST)Add New Event
exports.addEvent = (req, res, nxt) => {
    console.log(`Adding new Event With Title: ${req.body.title}.`);
    let result = validationResult(req);
    if (!result.isEmpty()) {
        let errMsgs = result.array().reduce((conc, err) => conc + err.msg + ".\n", "Validation Result Errors: \n")
        let errObj = new Error(errMsgs);
        errObj.status = 422;
        throw errObj;
    }
    let eventObj = new Event({
        title: req.body.title,
        eventDate: req.body.eventDate,
        mainSpeaker: req.body.mainSpeaker,
        speakers: req.body.speakers,
        students: req.body.students,
    });
    eventObj.save()
        .then((data) => {
            console.log(`Event Added ${data}`);
            res.status(201).json({ message: "Event Added" });

        })
        .catch(err => {
            nxt(err);
        });
}// End of POST

//(GET) Get Events
exports.getEvent = (req, res, nxt) => {
    Event.find({}).populate(["mainSpeaker", "students", "speakers"])
        .then(data => {
            res.status(200).json({ message: "List Of Upcoming Events", data });
        })
        .catch(err => nxt(err));

}//End of GET

//(DEL) Delete Event/s
exports.deleteEvent = (req, res, nxt) => {
    if (req.params.id || req.body.id) {
        let eventId = req.params.id || req.body.id;

        console.log("Deleting Event With ID: " + eventId);

        Event.deleteOne({ _id: eventId })
            .then(data => {
                if (data.deletedCount > 0){
                    console.log("Deleted Event With ID: " + eventId);
                res.status(200).json({ message: "Deleted Event", data });
                }else{
                nxt(`Failed To Delete Event, Event Not found`);

                }
            })
            .catch(err => {
                nxt(`Failed To Delete Event With ${err}`);

            });
    } else {

        res.status(400).json({ message: "cant delete event without Id" });
    }
}// End of DEL