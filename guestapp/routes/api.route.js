var express = require('express')

var router = express.Router()
var guests = require('./api/guests.route')


router.use('/guests', guests);


module.exports = router;