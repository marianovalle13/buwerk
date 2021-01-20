import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const profesionalSchema = new Schema({
    id: { type: String },
    name: { type: String },
    sex: { type: String },
    cuit: { type: String },
    dni: { type: String },
    phone: { type: String },
    jobZone: { type: String },
    city: { type: Schema.Types.ObjectId, ref: 'city' },
    province: { type: Schema.Types.ObjectId, ref: 'province' },
    birthDate: { type: Date },
    user: { type: String, unique: true }, //email
    password: { type: String },
    status: { type: Boolean, default: false },
    country: { type: Schema.Types.ObjectId, ref: 'country' },
    image: { type: String },
    category: { type: String },
    shortDesc: { type: String },
    desc: { type: String },
    // 
    rating: { type: Number },
    ratingAmount: { type: Number },
    //
    // timeDisponibility: [{ type: String }],
    timeDisponibilityMorning: { type: Boolean, default: false },
    timeDisponibilityAfternoon: { type: Boolean, default: false },
    timeDisponibilityNight: { type: Boolean, default: false },
    
    priceStart: { type: Number },
    priceEnd: { type: Number },
    //
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },

})
profesionalSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('profesional', profesionalSchema);
