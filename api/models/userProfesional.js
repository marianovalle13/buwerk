import mongoose, { Schema } from 'mongoose'

const userProfesional = new Schema({
    rating: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    profesional: { type: Schema.Types.ObjectId, ref: 'profesional' },
})

userProfesional.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('userProfesional', userProfesional);
