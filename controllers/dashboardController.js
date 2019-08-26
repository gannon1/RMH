var Person = require('../objects/Person');
var Donation = require('../objects/Donation');
var async = require('async');

exports.index=function(req, res){
    async.parallel({
        Person_donation: function(callback){
            Person.donation({}, callback)
        },
        Room_Status: function(callback){
            Room.status({}, callback);
        },
        Donation_somethingxxx: function(callback){
            Donation.Donation_somethingxxx({}, callback);//something goes here
        },
        function(err, results) {
            res.render('Dashboard', {
                title: 'Rebecca Morrison House',
                data: results,
                error: err,
            });    
        },
    });
};