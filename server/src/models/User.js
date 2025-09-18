import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "supervisor", "vet"],
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farm",
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
