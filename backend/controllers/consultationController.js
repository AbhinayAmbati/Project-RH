const Consultation = require("../models/Consultation");

// Create new consultation
const createConsultation = async (req, res) => {
    try {
        const { name, email, phone, project, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !project || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // Create consultation
        const consultation = await Consultation.create({
            fullName: name,
            email,
            phone,
            projectType: project,
            projectDetails: message,
            status: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Consultation request submitted successfully",
            data: consultation
        });
    } catch (error) {
        console.error("Create consultation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to submit consultation request"
        });
    }
};

// Get all consultations
const getConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find()
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            data: consultations
        });
    } catch (error) {
        console.error("Get consultations error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch consultations"
        });
    }
};

// Get single consultation
const getConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "Consultation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: consultation
        });
    } catch (error) {
        console.error("Get consultation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch consultation"
        });
    }
};

// Update consultation
const updateConsultation = async (req, res) => {
    try {
        const { status, consultationDate, notes } = req.body;
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "Consultation not found"
            });
        }

        // Update fields if provided
        if (status) consultation.status = status;
        if (consultationDate) consultation.consultationDate = consultationDate;
        if (notes) consultation.notes = notes;

        consultation.updatedAt = Date.now();
        await consultation.save();

        res.status(200).json({
            success: true,
            message: "Consultation updated successfully",
            data: consultation
        });
    } catch (error) {
        console.error("Update consultation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update consultation"
        });
    }
};

// Delete consultation
const deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: "Consultation not found"
            });
        }

        await consultation.deleteOne();

        res.status(200).json({
            success: true,
            message: "Consultation deleted successfully"
        });
    } catch (error) {
        console.error("Delete consultation error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete consultation"
        });
    }
};

module.exports = {
    createConsultation,
    getConsultations,
    getConsultation,
    updateConsultation,
    deleteConsultation
};
