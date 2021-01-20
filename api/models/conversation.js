import mongoose, { Schema, Mongoose } from 'mongoose'

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
	profesional: { type: Schema.Types.ObjectId, ref: 'profesional' },
	
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],

	improper: { type: Boolean , default: false},
	blocked: { type: Boolean , default: false},
	improperBy: { type: String },
	blockedBy: { type: String },

	available: { type: Boolean , default: true},
	date: { type: Date, default: Date.now }
});

schema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('Conversation', schema);
