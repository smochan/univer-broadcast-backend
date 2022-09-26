import { model, Schema } from 'mongoose';

const MessageSchema = new Schema({
   senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   message: {type: String, required: true},
   createdAt: {type: Date, default: Date.now},
   updatedAt: {type: Date},
   updatedBy: {type: Schema.Types.ObjectId, ref: 'User'},
   active: {type: Boolean, default: true},
});

export default model<IMessage>('Message', MessageSchema);