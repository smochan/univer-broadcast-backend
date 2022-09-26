import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
   name: {type: String, required: true},
   email: {type: String, unique: true, required: true},
   role: {type: String, enum: ['User', 'Admin', 'SuperAdmin'], default: 'User'},
   active: {type: Boolean, default: true},
   deactivatorId: {type: Schema.Types.ObjectId, ref: 'User'},

});

export default model<IUser>('User', UserSchema);