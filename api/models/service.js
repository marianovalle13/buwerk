import mongoose, { Schema } from 'mongoose'

const serviceSchema = new Schema({
    id: { type: String },
    creationDate: { type: Date, default: Date.now },
    // requiredDate: { type: Date },
    requiredDate: { type: String },
    requiredTime: { type: String },
    address: { type: String },
    city: { type: Schema.Types.ObjectId, ref: 'city' },
    province: { type: Schema.Types.ObjectId, ref: 'province' },
    country: { type: Schema.Types.ObjectId, ref: 'country' },
    serviceType: { type: String },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profesional: { type: Schema.Types.ObjectId, ref: 'profesional' },
    status: { type: String, default: 'Pendiente' },
})
serviceSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('service', serviceSchema);
