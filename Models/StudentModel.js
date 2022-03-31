const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("students", studentSchema);
