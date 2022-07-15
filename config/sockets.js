module.exports.chatSockets = function(socketServer){
    // setting sockets settings
    let io = require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            credentials: true,
            methods: ["GET", "POST"],
            allowedHeaders: ["sockets"],
        }
    });
    const { v4: uuidv4 } = require('uuid');

    io.sockets.on('connection',function(socket){
        console.log('A connection received',socket.id);

        socket.on('join_room',(roomId,userId) => {      // joined event
            console.log("Room Id:" + roomId + " userId:" + userId);

            socket.join(roomId);
            socket.broadcast.to(roomId).emit('user_connected',userId);
            // broadcast to everyone in the room that a user is connected

            socket.on('disconnect',function(){      // disconnect event 
                socket.broadcast.to(roomId).emit('user_disconnected',userId);
            });
        });

        socket.on('send_message',function(data){
            io.in(data.roomId).emit('recieve_message',data);    // chat box function
            // console.log(data);
        });
    });
}