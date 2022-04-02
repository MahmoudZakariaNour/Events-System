const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    eventDate: { type: Date, required: true },
    mainSpeaker: { type: String, required: true, ref:"speakers" },
    speakers: [{ type: String, ref:"speakers" }],
    students: [{ type: Number, required: true, ref:"students" }]
});

module.exports = mongoose.model("events", eventSchema);