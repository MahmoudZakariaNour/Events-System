const express = require("express");

const controller = require("./../Controllers/StudentsController");

const router = express.Router();

const isAuthorized = require("./../Middleware/AuthMiddleware");
const { body } = require("express-validator")

router.route("/students/:id?")
    .get(isAuthorized, controller.getStudent)
    .post(
        body("name")
            .isString().withMessage("Name should be string")
            .notEmpty().withMessage("Student should have a name")
        ,
        body("email")
            .isString().withMessage("Email should be string")
            .notEmpty().withMessage("Student should have a email")
        , isAuthorized, controller.addStudent)
    .put(isAuthorized, controller.updateStudent)
    .delete(isAuthorized, controller.deleteStudent);


module.exports = router;
