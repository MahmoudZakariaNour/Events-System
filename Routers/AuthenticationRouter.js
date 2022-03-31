const express=require("express");

const controllerAuth=require("./../Controllers/AuthenticationController");
const controllerSpkr=require("./../Controllers/SpeakersController");
const controllerStdn=require("./../Controllers/StudentsController");

const router=express.Router();

router.put("/login",controllerAuth.login);
router.post("/registerStudent",controllerStdn.addStudent);
router.post("/registerSpeaker",controllerSpkr.addSpeaker);

module.exports=router;