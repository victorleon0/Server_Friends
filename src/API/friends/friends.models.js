const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const friendSchema = new Schema({
    name: {type: String, required: true, trim: true},
    surname: {type: String, required: true, trim: true}, 
    phone: {type: Number, required: true, trim: true},
    adress: {type: String, required: false, trim: true},
    image: {type: String, required: false, trim: true},
    image2: {type: String, required: false, trim: true}
},
{
    timestamps:true
})

const friend = mongoose.model('friend', friendSchema);
module.exports = friend;
