import mongoose from 'mongoose';

const poultryDailyLogSchema = new mongoose.Schema({
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
    eggProduction: {
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
    flockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flock',
        required: true
    }
}, { timestamps: true });

export const PoultryDailyLog = mongoose.model('PoultryDailyLog', poultryDailyLogSchema);
