import mongoose from 'mongoose';

const healthReportSchema = new mongoose.Schema({
    groupType: {
        type: String,
        enum: ['flock', 'pigHerd', 'cattleHerd'],
        required: true
    },

    flockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flock'
    },

    pigHerdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PigHerd'
    },

    cattleHerdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CattleHerd'
    },

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    initialSymptoms: {
        type: [String],
        required: true
    },

    severityLevel: {
        type: String,
        enum: ['low', 'moderate', 'high', 'critical'],
        default: 'low'
    },

    provisionalDiagnosis: {
        type: String,
    },

    vetDiagnosis: {
        type: String,
    },

    prescriptions: [{
        medicine: String,
        dosage: String,
        duration: String,
        instructions: String
    }],

    labTests: [{
        testName: String,
        result: String,
        date: Date
    }],

    vaccinationsGiven: [{
        vaccineName: String,
        date: Date,
        batchNumber: String
    }],

    followUpDate: {
        type: Date
    },

    notes: {
        type: String
    },

    status: {
        type: String,
        enum: ['pending', 'under_review', 'confirmed', 'closed'],
        default: 'pending'
    }

}, { timestamps: true });

export const HealthReport = mongoose.model('HealthReport', healthReportSchema);
