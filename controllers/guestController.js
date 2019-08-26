var Guest = require('../objects/Guest');
var Registration = require('../objects/Registration');
var Patient = require('../objects/Patient');
var Staff = require('../objects/Staff');
var Room = require('../objects/Room');

var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all guests.
exports.guest_list = function (req, res, next) {
    Guest.find({}, 'guest')
        .populate('guest')
        .execute(function (err, list_guests) {
            if (err) { return next(err)};
            res.render('guest_list', { title: 'Guest List', guest_list: list_guests });
        });
};
// Display detail page for a specific guest.
exports.guest_read = function(req, res, next) {
    Guest.find()
    .execute(function (err, results) {
        if(err) {return next(err)};
        if (results == null){
            var err = new Error('Guest not found');
            err.status = 404;
            return next(err)
        };
    })
};
// Display guest create form on GET.
exports.guest_create_get = function (req, res, next) {
    async.parallel({


    }, function (err, results) {
        if (err) { return next(err); }
        res.render('registration_form', { title: 'Create Registration', patients: results.patients, guests: results.guests, staffs: results.staffs, rooms: results.rooms })
    });
};
// Handle guest create on POST.
    exports.guest_create_post = [
        //Validation
        body('firstName').isLength({ min: 1 }).trim().withMessage('Missing First Name'),
        body('lastName').isLength({ min: 1 }).trim().withMessage('Missing Last Name'),
        body('vehicleType').isLength({ min: 1 }).trim().withMessage('Missing Vehicle Type'),
        body('plateNumber').isLength({ min: 1 }).trim().withMessage('Missing Plate Number'),
        body('violation').isLength({ min: 1 }).trim().withMessage('No Violation'),
        sanitizeBody('firstName').trim().escape(),
        sanitizeBody('lastName').trim().escape(),
        sanitizeBody('vehicleType').trim().escape(),
        sanitizeBody('plateNumber').trim().escape(),
        sanitizeBody('violation').trim().escape(),


        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.render('guest_create', {
                    title: 'New Guest Error',
                    errors: errors.array()
                });
                return;
            }
            else {
                var guest = new Guest({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    vehicleType: req.body.vehicleType,
                    plateNumber: req.body.plateNumber,
                    violation: req.body.violation
                });
                guest.save(function (err) {
                    if (err) { return next(err) };
                    res.redirect(guest.url);
                });
            }
        }
        //res.send('NOT IMPLEMENTED: guest create POST');
    ];

// Display guest delete form on GET.
exports.guest_delete_get = function (req, res, next) {
    Guest.findById(req.params.id).exec(function (err, results) {
        if (err) { return next(err) };
        //redirect will need updated url address-----------
        if (results == null) { res.redirect('/users/guest') };
        res.render('guest_delete', {
            title: 'Delete Guest',
            Guest: results
        });
    });
    // res.send('NOT IMPLEMENTED: Guest delete GET');
};
// Handle guest delete on POST.
exports.guest_delete_post = function (req, res, next) {
    Guest.findByIdAndDelete(req.params.id, function deleteGuest(err) {
        if (err) return next(err);
        //redirect will need updated url address--------------
        res.redirect('/users/guest');
    });
    // res.send('NOT IMPLEMENTED: Guest delete POST');
};
// Display guest update form on GET.
exports.guest_update_get = function (req, res) {
    async.parallel({
        guest: function (callback) {
            Guest.findById(req.params.id).exec(callback);
        },
    }),
        function (err, res, results) {
            if (err) { return next(err) };
                res.render('guest_update', {
                    title: 'Update Guest',
                    guest: results.guest
                });
        };
};
    // res.send('NOT IMPLEMENTED: guest update GET');
// Handle guest update on POST.
exports.guest_update_post = [
    //Validation
        body('firstName').isLength({ min: 1 }).trim().withMessage('Missing First Name'),
        body('lastName').isLength({ min: 1 }).trim().withMessage('Missing Last Name'),
        body('vehicleType').isLength({ min: 1 }).trim().withMessage('Missing Vehicle Type'),
        body('plateNumber').isLength({ min: 1 }).trim().withMessage('Missing Plate Number'),
        body('violation').isLength({ min: 1 }).trim().withMessage('No Violation'),
        sanitizeBody('firstName').trim().escape(),
        sanitizeBody('lastName').trim().escape(),
        sanitizeBody('vehicleType').trim().escape(),
        sanitizeBody('plateNumber').trim().escape(),
        sanitizeBody('violation').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('guest_update', {
                title: 'Update Guest Failed',
                _id: guest._id,
                guest: guest,
                errors: errors.array()
            });
        return;
        }
        else {
            var guest = new Guest({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                vehicleType: req.body.vehicleType,
                plateNumber: req.body.plateNumber,
                violation: req.body.violation,
                _id:req.params.id
            });
        };
    }
    //res.send('NOT IMPLEMENTED: guest update POST');
];