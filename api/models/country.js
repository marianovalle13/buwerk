import mongoose, { Schema } from 'mongoose'

const countrySchema = new Schema({
    id: { type: String },
    name: { type: String },
})

countrySchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('country', countrySchema);
