// We need to be able to access the Service 
//that we just created so let's pull that in

var GuestService = require('../services/guest.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getGuests = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var guests = await GuestService.getGuests({}, page, limit)
            
    // Return the guests list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: guests, message: "Succesfully Guests Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    // lets create guestlist
    exports.createGuest = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var guest = {
            name: req.body.name,
           roomSize: req.body.roomSize,
           roomNum: req.body.roomNum,
           payment: req.body.payment,
           numNight: req.body.numNight,
           status: req.body.status
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdGuest = await GuestService.createGuest(guest)
            return res.status(201).json({status: 201, data: createdguest, message: "Succesfully Created Guest"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Guest Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    // update Guest

    exports.updateGuest = async function(req, res, next){

    // Id is necessary for the update guest

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var guest = {
        id,
        name: req.body.name ? req.body.name : null,
        roomSize: req.body.roomSize ? req.body.roomSize : null,
        roomNum: req.body.roomNum ? req.body.roomNum: null,
        payment: req.body.payment ? req.body.payment : null,
        numNight: req.body.numNight ? req.body.numNight : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedGuest = await GuestService.updateGuest(guest)
        return res.status(200).json({status: 200, data: updatedGuest, message: "Succesfully Updated Guest"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}
    // remove guest
    exports.removeGuest = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await GuestService.deleteGuest(id)
            return res.status(204).json({status:204, message: "Succesfully Guest Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }

