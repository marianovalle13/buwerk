import mongoose, { Schema } from 'mongoose'

const profesionalComent = new Schema({
	id: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profesional: { type: Schema.Types.ObjectId, ref: 'profesional' },
	comment: { type: String },
	timestamp: { type: Date, default: Date.now },
})

profesionalComent.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('profesionalComent', profesionalComent);
