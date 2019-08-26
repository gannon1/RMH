//Requires
var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

//Object
var RoomSchema = new Schema({
    roomNumber: {type: String, max: 10},
    handicapAccess: {type: String, max: 10},
    status: {type: String, max: 10},

});

//Virtuals
RoomSchema
.virtual('url')
.get(function(){
    return '/admin/room/' + this._id;
})

RoomSchema
.virtual('Number')
.get(function() {
    return "Room " + this.roomNumber;
})

RoomSchema
.virtual('Handi')
.get(function() {
    return this.handicapAccess;
})

RoomSchema
.virtual('Stat')
.get(function() {
    return this.status;
})
//Export for mongoose
module.exports = mongoose.model('Room', RoomSchema);
