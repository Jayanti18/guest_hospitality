var express = require('express');

var router = express.Router();

// Getting the Guest Controller that we just created

var GuestController = require('../../controllers/guest.controller.js');


// Map each API to the Controller FUnctions

router.get('/', GuestController.getGuests)

router.post('/', GuestController.createGuest)

router.put('/', GuestController.updateGuest)

router.delete('/:id',GuestController.removeGuest)


// Export the Router

module.exports = router;