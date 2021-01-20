import mongoose, { Schema } from 'mongoose'

const notificationSchema = new Schema({
    id: { type: String },
    timestamp: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    title: { type: String },
    message: { type: String },
    directedTo: { type: Array, default:[] }
})
notificationSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('notification', notificationSchema);
