import { model, Schema } from 'mongoose';

const ReplySchema = new Schema({
   messageId: {type: Schema.Types.ObjectId, ref: 'Message', required: true},
   senderId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   message: {type: String, required: true},
   createdAt: {type: Date, default: Date.now},
   // active: {type: Boolean, default: true},
   // updatedAt: {type: Date},
});

export default model<IReply>('Reply', ReplySchema);