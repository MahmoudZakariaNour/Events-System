const mongoose = require("mongoose");                           //NodeJS-MongoDB Driver 
const Student = require("./../Models/StudentModel.js")          //Students Schema
const { validationResult } = require("express-validator");      //Input Validator
const bcrypt = require('bcryptjs');                             //En/Decrypt Tool
var validator = require("email-validator");                     //Email Validator

//(POST)Add New Student
exports.addStudent = (req, res, nxt) => {
    console.log(`Registering new Student With Name: ${req.body.name}.`);
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
            let studentObject = new Student({
                _id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            studentObject.save()
                .then((data) => {
                    console.log(`Student Added ${data}`);
                    res.status(201).json({ message: "Student Added" });

                })
                .catch(err => {
                    nxt(err);
                })
        }).catch(err => {
            nxt(`Failed To Encrypt Password With ${err}`);

        });
}// End of POST

//(GET) Get Student/s
exports.getStudent = (req, res, nxt) => {
    // If the optional id param is givin Then GetThatStudent
    if (req.params.id || req.body.id) {
        let studentId = req.params.id || req.body.id;
        // console.log(req);
        Student.find({ _id: studentId })
            .then(data => {
                res.status(200).json({ message: "Selected Student", data });
            })
            .catch(err => nxt(err));

    } else {
        //GetAllStudents
        Student.find({})
            .then(data => {
                res.status(200).json({ message: "List Of Students", data });
            })
            .catch(err => nxt(err));

    }
}//End of GET

//(DEL) Delete User/s
exports.deleteStudent = (req, res, nxt) => {
    // console.log(req.params);
    if (req.params.id || req.body.id) {
        let studentId = req.params.id || req.body.id;

        console.log("Deleting Student With ID: " + studentId);

        Student.deleteOne({ _id: studentId })
            .then(data => {
                if (data.deletedCount > 0)
                    console.log("Deleted Student With ID: " + studentId);
                res.status(200).json({ message: "Deleted Student", data });

            })
            .catch(err => {
                nxt(`Failed To Delete User With ${err}`);

            });
    } else {
        if (req.body.admin && req.body.admin == "admin") {
            console.log("Cleaning Students");
            Student.deleteMany({})
                .then(data => {
                    console.log("Deleted All Students");
                    res.status(200).json({ message: "All Student Deleted", data });

                })
                .catch(err => {
                    nxt(`Failed To Delete All User With ${err}`);

                });
        } else {
            res.status(400).json({ message: "cant delete user without Id" });
        }
    }
}// End of DEL

//(PUT) Update Student Data
exports.updateStudent = (req, res) => {
    if (req.body.id) {
        Student.updateOne()
            .then(data => {
                // res.status(200).json({ message: `Update Student :${req.params.id} Data` });
                console.log("Deleted All Students");
                res.status(200).json({ message: "All Student Deleted", data });

            })
            .catch(err => nxt(err))
    } else {
        res.status(400).json({ message: "cant update user without Id" });
    }
}
