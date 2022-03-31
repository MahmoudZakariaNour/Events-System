const express = require("express");

const controller = require("./../Controllers/EventsController");

const router = express.Router();

const { body } = require("express-validator")

router.route("/events")
    .get(controller.getEvent)
    .post(
        body("title")
            .isString().withMessage("Title should be string")
            .notEmpty().withMessage("Event should have a title")
        ,
        body("date")
            .isDate().withMessage("Event Date is not a valid date")
            .notEmpty().withMessage("Event should have a date")
        ,
        body("mainSpeaker")
            .isString().withMessage("Main speaker should be string")
            .notEmpty().withMessage("Event should have a main speaker")
        ,
        body("speakers")
            .isArray().withMessage("Speakers should be an array")

        ,
        body("students")
            .isArray().withMessage("students should be an array")
            .notEmpty().withMessage("Event should have a students list")
        ,
        controller.addEvent)
    // .put(controller.updateEvent)
    .delete(
        body("id")
            .isString().withMessage("Event id should be string")
            .notEmpty().withMessage("Can't delete event withour ID")
        ,
        controller.deleteEvent);


module.exports = router;
