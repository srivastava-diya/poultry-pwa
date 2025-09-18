import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    alertDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    issuedByVet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
}, { timestamps: true });

export const Alert = mongoose.model('Alert', alertSchema);
