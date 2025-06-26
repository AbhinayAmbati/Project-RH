const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    projectType: {
        type: String,
        enum: ["Residential", "Commercial", "Renovation", "Interior Design", "Smart Home"],
        required: true,
    },
    projectDetails: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "contacted", "scheduled", "completed", "cancelled"],
        default: "pending",
    },
    consultationDate: {
        type: Date,
        default: null,
    },
    notes: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Consultation = mongoose.model("Consultation", consultationSchema);

module.exports = Consultation;