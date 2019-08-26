var Patient = require('../objects/Patient');
var Person = require('../objects/Person');

var async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all patients.
exports.patient_list = function(req, res, next) {
    Patient.find()
    .sort([['lastName', 'ascending']])
    .execute(function (err, list_patients) {
        if (err) {return next(err)};
        res.render('patient_list', {title: 'Patient List', patient_list: list_patients});
    });
//res.send('NOT IMPLEMENTED: patient list');
};


// Display detail page for a specific patient.
exports.patient_read = function(req, res, next) {
    Patient.find()
    .execute(function (err, results) {
        if (err) {return next(err)};
        if (results == null) {
            var err = new Error('Patient not found');
            err.status = 404;
            return next(err)
        };
        res.render('patient_read', {
            title: "Patient Detail",
            patient: results})
        })

//  res.send('NOT IMPLEMENTED: patient detail: ' + req.params.id);
};

// Display patient create form on GET.
exports.patient_create_get = function(req, res) {
    async.parallel({
        patient: function(callback) {
            Patient.find({},'../users/patient').exec(callback);
        },
        function (err, results) {
            if (err) {return next(err)};
            res.render('patient_create', {
                title: 'New Patient',
                person: results.person,
            });
        }
    })
// res.send('NOT IMPLEMENTED: patient create GET');
};

// Handle patient create on POST.
exports.patient_create_post = [
    //Validation
    body('person').isLength({min: 1}).trim().withMessage('Missing Person'),
    body('patientLocation').isLength({min: 1}).trim().withMessage('Missing Location'),

    sanitizeBody('*').trim().escape(),

    (req,res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('patient_create', {
                title: 'New Patient Error',
                errors: errors.array()
            });
            return;
        }
        else {
            var patient = newPatient({
                person: req.body.person,
                location: req.body.location
            });
            patient.save(function(err) {
                if (err) {return next(err)};
                res.redirect(patient.url);
            });
        }
    }
// res.send('NOT IMPLEMENTED: patient create POST');
];

// Display patient delete form on GET.
exports.patient_delete_get = function(req, res, next) {
    Patient.findbyId(req.params.id)
    .populate('person')
    .execute(function(err,results) {
        if(err) {return next(err)};
        if(results==null) {res.redirect('../users/patient')};
        res.render('patient_delete', { 
            title: 'Delete Patient', 
            patient: results });
    });
// res.send('NOT IMPLEMENTED: patient delete GET');
};


// Handle patient delete on POST.
exports.patient_delete_post = function(req, res, next) {
    Patient.findByIdAndDelete(req.params.id, function deletePatient(err) {
        if (err) return next(err);
        //redirect will need updated url address--------------
        res.redirect('/users/patient');
    });
// res.send('NOT IMPLEMENTED: patient delete POST');
};

// Display patient update form on GET.
exports.patient_update_get = function(req, res) {
    async.parallel({
        patient: function(callback) {
            Patient.findById(req.params.id)
            .populate('person')
            .exec(callback);
        },  
        person: function(callback) {
            Person.find(callback);
        },      
    }),
    function (err,res, results) {
        if (err) {return next(err); }
        if (results.patient==null) {
            var err = new Error('Patient not found');
            err.status = 404;
            return next(err);
        }
        res.render('patient_update', { title: 'Update Patient', patient: results.patient, person: results.person})
    };    
// res.send('NOT IMPLEMENTED: patient update GET');
};


// Handle patient update on POST.
exports.patient_update_post = [
    //Validation
    body('person').isLength({min: 1}).trim().withMessage('Missing Person'),   
    body('patientLocation').isLength({min: 1}).trim().withMessage('Missing Location'),

    
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('patient_update', {
                title: 'Update Patient Failed',
                _id: patient._id,
                patient: patient,
                errors: errors.array()
            });
        return;
        }
        else {
            var patient = new Patient({
                person: req.body.person,
                location: req.body.location,
                id:req.params.id
            });
        };
    }
// res.send('NOT IMPLEMENTED: patient update POST');
];