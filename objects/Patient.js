//Requires
var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

//Object
var PatientSchema = new Schema({
    patientLocation: { type: String, max: 100 }
});

//Export for mongoose
module.exports = mongoose.model('Patient', PatientSchema);

//Virtuals
