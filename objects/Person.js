//Requires
var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

//Object
var PersonSchema = new Schema({
    lastName: {type: String, max: 100, required: true},
    firstName: {type: String, max: 100, required: true},
    homePhone: {type: Number, min: 10},
    cellPhone: {type: Number, min: 10, required: true},
    email: {type: String, required: true},
    homeAddress: {type: String, },
    city: {type: String, },
    state: {type: String, },
    zip: {type: String, },
    emergencyContact: {type: String, },
    emergencyPhone: {type: Number, }
});
//Virtuals
PersonSchema
.virtual('url')
.get(function(){
    return '/admin/Person/' + this._id;
})

PersonSchema
.virtual('First_name')
.get(function() {
    return this.firstName;
})

PersonSchema
.virtual('Last_name')
.get(function() {
    return this.lastName;
})

PersonSchema
.virtual('emailAddress')
.get(function() {
    return this.email;
})

PersonSchema
.virtual('Cell_Phone')
.get(function() {
    return this.cellPhone;
})

PersonSchema
.virtual('name')
.get(function() {
    return this.lastName + ', ' + this.firstName;
})

//Export for mongoose
module.exports = mongoose.model('Person', PersonSchema);


