const express=require("express");

const controller=require("./../Controllers/StudentsController");

const router=express.Router();

router.route("/students/:id?")
.get(controller.getStudent)
.post(controller.addStudent)
.put(controller.updateStudent)
.delete(controller.deleteStudent);


module.exports=router;
