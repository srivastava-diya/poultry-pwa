import mongoose from 'mongoose';

const cattleDailyLogSchema = new mongoose.Schema({
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
    milkProduction: {
        type: Number,
        required: true
    },
    healthRemark: {
        type: String   //for vaccination details
    },
    notes: {
        type: String
    },
    loggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    herdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CattleHerd',
        required: true
    }
}, { timestamps: true });

export const CattleDailyLog = mongoose.model('CattleDailyLog', cattleDailyLogSchema);
