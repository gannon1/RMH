//Requires
var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

//Object
var StaffSchema = new Schema({
    lastName: {type: String, max: 100, required: true},
    firstName: {type: String, max: 100, required: true},
    phone: {type: Number, max: 10},
    employeeStatus: {type: String, max: 10},
    startDate: {type: String, },
    endDate: {type: String, }
});

//Export for mongoose
module.exports = mongoose.model('Staff', StaffSchema);

//Virtuals