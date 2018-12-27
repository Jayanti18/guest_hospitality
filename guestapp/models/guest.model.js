var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var GuestSchema = new mongoose.Schema({
    name: String,
    roomSize: String,
    roomNum: Number,
    payment: String, 
    numNight: Number,
    date: Date,
    status: String
})

GuestSchema.plugin(mongoosePaginate)
const Guest = mongoose.model('Guest', GuestSchema)

module.exports = Guest;