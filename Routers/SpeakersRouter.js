const express = require("express");

const controller = require("./../Controllers/SpeakersController");

const router = express.Router();

const isAuthorized = require("./../Middleware/AuthMiddleware");
const { body } = require("express-validator")


router.route("/speakers/:id?")
    .get(isAuthorized, controller.getSpeaker)
    .post(
        body("name")
            .isString().withMessage("Name should be string")
            .notEmpty().withMessage("Speaker should have a name")
        ,
        body("email")
            .isString().withMessage("Email should be string")
            .notEmpty().withMessage("Speaker should have a email")
        , isAuthorized, controller.addSpeaker)
    .put(isAuthorized, controller.updateSpeaker)
    .delete(isAuthorized, controller.deleteSpeaker);


module.exports = router;
