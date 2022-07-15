const invite = require('../mailers/invite-mailer');
module.exports.room_render = function(req,res){
    // if user is logged in then make a call else take to sign in page
    if(!req.isAuthenticated()){
        req.flash('success','Please ! Login to Continue');
        return res.redirect('/users/sign-in');
    }
    // rendering room
    return res.render('room',{
        title : "Room",
        roomId : req.params.room_id
    });
}

// Sending invite link

module.exports.invite = function(req,res){
    if(req.xhr){
        invite.inviteLink(req.body);
        // console.log(req.body);
        req.flash('success', 'Invite Send Successfully');
        return res.status(200).json({
            message: "Invite Send!"
        });
    }
    return;
}