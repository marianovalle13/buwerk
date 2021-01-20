import mongoose, { Schema } from 'mongoose'
import cityModel from './city';
import utils from '../utils/mongooseFunctions';


const provinceSchema = new Schema({
    id: { type: String },
    name: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'country' },
})

provinceSchema.plugin(require('meanie-mongoose-to-json'));

// provinceSchema.pre('remove', function (next) {
//     console.log('pre REMOVE called')
//     utils.findManyAndPreRemove(cityModel , { province: this._id });
//     next(cityModel);
// })

export default mongoose.model('province', provinceSchema);
