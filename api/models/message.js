import mongoose, { Schema, Mongoose } from 'mongoose'

const schema = new Schema({
	conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
	body: { type: String, required: true },
	author: { type: String, required: true },
	time: { type: String, required: true },
	date: { type: Date, default: Date.now }
});
// },{timestamps: true});
schema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('Message', schema);
