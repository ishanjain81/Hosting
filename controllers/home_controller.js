const { v4: uuidv4 } = require('uuid');
// rendering home page
module.exports.home = function(req,res){
    return res.render('home',{
        title : "Home"
    });
}
// making call
module.exports.make_call = function(req,res){
    let room_id = uuidv4();     // unique ids for calls
    if(!req.isAuthenticated()){ // if user not logged in got to sign in
        req.flash('success','Please ! Login to Continue');
        return res.redirect('/users/sign-in');
    }
    return res.redirect(`/room/${room_id}`);
}

module.exports.join_call = function(req,res){
    if(!req.isAuthenticated()){         // if user is logged in then make a call else take to sign in page
        req.flash('success','Please ! Login to Continue');
        return res.redirect('/users/sign-in');
    }
    return res.redirect(`/room/${req.body.code}`);
}