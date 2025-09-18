import mongoose from 'mongoose';

const pigDailyLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    mortality: {
        type: Number,
        required: true
    },
    feedIntake: {
        type: Number,
        required: true
    },
    waterIntake: {
        type: Number,
        required: true
    },
    avgWeightGain: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    },
    loggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pigHerdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PigHerd',
        required: true
    }
}, { timestamps: true });

export const PigDailyLog = mongoose.model('PigDailyLog', pigDailyLogSchema);
