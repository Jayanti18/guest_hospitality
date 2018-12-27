// Access our newly created Mongoose Model
var Guest = require('../models/guest.model.js');

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getGuests = async function (query, page, limit) {

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }
    //Let's create a Try and Catch function 
    //that way we have some error handling set. 
    //Waiting for the promise

    try {
        var guests = await Guest.paginate(query, options)

        //Once the Mongoose promise is returned 
        //we're going to go ahead and return 
        //the To Do List it has produced 

        return guests;

    } catch (e) {

        //If the try didn't work we're going to 
        //go ahead and let the users know what kind of 
        //Error we have

        throw Error('Oh No! We got an error while Paginating our Guest lists Task, so sorry!')
    }
}
exports.createGuest = async function (guest) {

    // Creating a new Mongoose Object by using the new keyword copy from slide 17
    // comeback and change the field


    var newGuest = new Guest({
        name: guest.name,
        roomSize: guest.roomSize,
        roomNum: guest.roomNum,
        payment: guest.payment,
        numNight: guest.numNight,
        date: new Date(),
        status: guest.status
    })

    try {

        // Let's go ahead and save the Guest 

        var savedGuest = await newGuest.save()

        return savedGuest;
    } catch (e) {

        //if we can't create a Guest we want to throw an error 

        throw Error("Error while Creating Guest")
    }
}

// update Guest list
exports.updateGuest = async function(guest){
    var id = guest.id

    try{
        //Find the old Guest Object by the Id
    
        var oldGuest = await Guest.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Guest")
    }

    // If no old Guest Object exists return false

    if(!oldGuest){
        return false;
    }

    console.log(oldGuest)

    //Edit the Guest Object 

    oldGuest.name = guest.name
       oldGuest.roomSize = guest.roomSize
       oldGuest.roomNum = guest.roomNum
       oldGuest.payment = guest.payment
       oldGuest.numNight = guest.numNight
       oldGuest.status = guest.status


    console.log(oldGuest)

    try{
        var savedGuest = await oldGuest.save()
        return savedGuest;
    }catch(e){
        throw Error("And Error occured while updating the Guest");
    }
}

// delete 

exports.deleteGuest = async function(id){
    
    // Delete the Guest

    try{
        var deleted = await Guest.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Guest Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Guest")
    }
}
