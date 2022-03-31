const express=require("express");

const controller=require("./../Controllers/SpeakersController");

const router=express.Router();

const isAuthorized = require("./../Middleware/AuthMiddleware");

router.route("/speakers/:id?")
.get(isAuthorized,controller.getSpeaker)
.post(isAuthorized,controller.addSpeaker)
.put(isAuthorized,controller.updateSpeaker)
.delete(isAuthorized,controller.deleteSpeaker);


module.exports=router;
