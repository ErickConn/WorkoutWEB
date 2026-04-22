import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    activePlanId: String,
    activeDayByUser: String
});

const User = mongoose.model('User', userSchema);

export default User;
