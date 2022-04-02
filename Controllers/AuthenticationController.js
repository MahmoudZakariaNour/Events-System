const StudentModel = require("./../Models/StudentModel.js")
const SpeakerModel = require("./../Models/SpeakerModel.js")
// const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()


exports.login = (req, res, nxt) => {
    let token;
    console.log("Try Login:" + req.body.email);
    //Try Login as Admin
    if (req.body.email == "admin" && req.body.password == "admin") {
        token = jwt.sign(
            {
                role: "admin",
                email: "admin@adm.in",
                id: "1"
            },
            process.env.SecretKey,
            { expiresIn: "1h" });
        console.log("Logged In As Admin");
        res.status(200).json({ message: "logged in as admin", token })

    }
    else {
        // Try Login as Student
        StudentModel.findOne({ email: req.body.email/*, password: req.body.password*/ })
            .then((dataStudent) => {
                // if (dataStudent == null) console.log("Login With Null Student Data");
                if (dataStudent != null && bcrypt.compareSync(req.body.password, dataStudent.password)) {
                    //Logged in as Student  
                    token = jwt.sign({
                        role: "student",
                        email: dataStudent.email,
                        id: dataStudent.id
                    },
                        process.env.SecretKey, { expiresIn: "1h" });
                    console.log("Logged In As Student");
                    res.status(200).json({ message: "logged in as student", token });
                }
                else {
                    //Try login as Speaker
                    // if (dataStudent == null) console.log("Login With Null Speaker Data");
                    SpeakerModel.findOne({ email: req.body.email })
                        .then((dataSpeaker) => {
                            if (dataSpeaker != null && bcrypt.compareSync(req.body.password, dataSpeaker.password)) {
                                //Logged in as Speaker  
                                token = jwt.sign({
                                    role: "speaker",
                                    email: dataSpeaker.email,
                                    id: dataSpeaker.id
                                },
                                    process.env.SecretKey, { expiresIn: "2h" });
                                console.log("Logged In As Speaker");
                                res.status(200).json({ message: "logged in as speaker", token });
                            }
                        })
                        .catch((err) => {
                            nxt(new Error("Wrong Email Or Password"));

                        });
                }

            })
            .catch(err => nxt(err))
    }
}