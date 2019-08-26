//Requires
var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

//Object
var GuestSchema = new Schema({
    vehicleType: { type: String, max: 100 },
    plateNumber: { type: String, max: 100 },
    violation: { type: String, max: 100 },
});

//Export for mongoose
module.exports = mongoose.model('Guest', GuestSchema);

//Virtuals