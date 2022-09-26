import { model, Schema } from 'mongoose';

const AuthSchema = new Schema({
   userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   password: {type: String, required: true},
   active: {type: Boolean, default: true},
})

export default model<IAuth>('Auth', AuthSchema);