import mongoose, { Schema } from 'mongoose'

const citySchema = new Schema({
    id: { type: String },
    name: { type: String },
    province: { type: Schema.Types.ObjectId, ref: 'province' },
    country: { type: Schema.Types.ObjectId, ref: 'country' },
})
citySchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('city', citySchema);
