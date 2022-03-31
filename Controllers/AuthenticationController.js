const StudentModel = require("./../Models/StudentModel.js")
const SpeakerModel = require("./../Models/SpeakerModel.js")
// const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('dotenv').config()


exports.login = (req, res, nxt) => {
    let token;
    console.log(req.body);
    //Try Login as Admin
    if (req.body.email == "admin" && req.body.password == "admin") {
        token = jwt.sign({ role: "admin", userName: "mahmoud" },
            process.env.SecretKey,
            { expiresIn: "1h" });
        res.status(200).json({ message: "logged in as admin", token })

    }
    else {
        // Try Login as Student
        StudentModel.findOne({ email: req.body.email/*, password: req.body.password*/ })
            .then((dataStudent) => {
                if (dataStudent != null && bcrypt.compareSync(req.body.password, dataStudent.password)) {
                    //Logged in as Student  
                    token = jwt.sign({
                        role: "student",
                        email: dataStudent.email,
                        id: dataStudent.id
                    },
                        process.env.SecretKey, { expiresIn: "1h" });
                    res.status(200).json({ message: "logged in as student", token });
                }
                else {
                    //Try login as Speaker
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
                                res.status(200).json({ message: "logged in as speaker", token });
                            }
                        })
                        .catch(err => nxt(err));
                    // if (data == null)
                }

                nxt(new Error("Not Autheniticated"));
                // res.status(200).json({ message: "logged in", token })
            })
            .catch(err => nxt(err))
        //    let errorObject=new Error("Not Athenticated");
        //    errorObject.status=403;// check 
        //    throw errorObject;
    }

    // console.log(`Login Into User ${req.body.un}.`);
    // res.status(200).json({ message: `Login Into User ${req.body.un}.` });
}