import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
	id: {type: String},
	name: { type: String },
	sex: { type: String },
	phone: { type: String },
	user: { type: String, unique: true }, //email
	password: { type: String },
	birthDate: { type: Date },
	city: { type: Schema.Types.ObjectId, ref: 'city' },
	province: { type: Schema.Types.ObjectId, ref: 'province' },
	country: { type: Schema.Types.ObjectId, ref: 'country' },
	// places
	places: [ { type: Object } ],
	image: { type: String },

})
userSchema.plugin(uniqueValidator)
userSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('user', userSchema);
