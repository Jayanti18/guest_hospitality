var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var GuestSchema = new mongoose.Schema({
    name: String,
    email: String,
    roomSize: String,
    roomNum: Number,
    checkInDate: Date,
    checkOutDate: Date,
    payment: String, 
    status: String
})

GuestSchema.plugin(mongoosePaginate)
const Guest = mongoose.model('Guest', GuestSchema)

module.exports = Guest;