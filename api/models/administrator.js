import mongoose, { Schema } from 'mongoose'

const administratorSchema = new Schema({
	id: {type: String},
	user: { type: String },
	password: { type: String },
})
administratorSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('administrator', administratorSchema);
