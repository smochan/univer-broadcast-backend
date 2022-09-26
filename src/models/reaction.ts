import { model, Schema } from 'mongoose';

const ReactionSchema = new Schema({
   messageId: {type: Schema.Types.ObjectId, ref: 'Message', required: true},
   userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   reaction: {type: String, enum: ['', 'like', 'dislike'], required: true}
});

export default model<IReaction>('Reaction', ReactionSchema);