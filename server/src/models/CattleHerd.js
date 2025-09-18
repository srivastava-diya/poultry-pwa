import mongoose from 'mongoose';

const cattleHerdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    acquisitionDate: {
        type: Date,
        required: true
    },
    initialCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'depleted', 'sold'],
        default: 'active',
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    }
}, { timestamps: true });

export const CattleHerd = mongoose.model('CattleHerd', cattleHerdSchema);
