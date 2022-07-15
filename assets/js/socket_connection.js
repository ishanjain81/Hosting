
const socket = io.connect('http://localhost:5000',{
        transport: ['websocket'],
        withCredentials: true,
        extraHeaders: {
            "sockets": "abcd"
        }
});
let myVideoStream;
let myId;
socket.on('connect',function(){
    console.log('Connection estlablished using sockets.....');
    const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
    const myPeer = new Peer({
        host : 'localhost',
        port : '5001',
        path : '/peerjs',
        generateClientId: customGenerationFunction
    });

    //setting our own video
    const videoBox = document.getElementById('video-box');
    const myVideo = document.createElement('video');
    myVideo.classList.add('m-top');
    //ensures that we dont hear our own voice
    myVideo.muted = true;

    const peers = {};

    //Rendering our own video
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream =>{
        streamVideo(myVideo,stream);
        myVideoStream = stream;
        myPeer.on('call',function(call){     // making a call to peer
            call.answer(stream);            // answering a call
            const video = document.createElement('video');
            video.classList.add('m-top');
            peers[call.peer] = call;        // storing peerid to ending the call
            call.on('stream',function(userVideoStream){
                streamVideo(video,userVideoStream);
            });
            call.on('close',function(){
                video.remove();             // ending the call on disconnection
            });
        });

        // event called when a user connected in a room
        socket.on('user_connected',function(userId){
            console.log(`User connected : ${userId}`);
            
            setTimeout(()=>{
                connectToNewUser(userId,stream)
            },1000);
            // connectToNewUser(userId,stream);
        });
    });
    // event called when a user disconnected from a room
    socket.on('user_disconnected',userId => {
        console.log('User Disconnected:' + userId);
            if(peers[userId]){
                peers[userId].close();
            }
    });

    myPeer.on('open', id => {
        socket.emit('join_room',roomId,id);
        myId = id;
    });
    //Rendering our own video
    // socket.emit('join_room',roomId,10);

    // For Chatting Engine
    let chatBox = document.getElementById('user-chat-box');
    let sendMessage = document.getElementById('send-message');
    //send Message on Click
    sendMessage.addEventListener('click',() => {
        // console.log(msg);
        let msg = document.getElementById('chat-message-input').value;
        if(msg != ''){
            socket.emit('send_message',{
                message: msg,
                roomId: roomId,
                user_name: user_name,
                id : myId
            });
            msgContainer.value = ""
        }
    });
    //send Message on Enter
    let msgContainer = document.getElementById('chat-message-input');
    msgContainer.addEventListener("keyup",(event) => {
        if(event.key === 'Enter'){
            let msg = document.getElementById('chat-message-input').value;
            if(msg != ''){
                socket.emit('send_message',{
                    message: msg,
                    roomId: roomId,
                    user_name: user_name,
                    id : myId
                });
                msgContainer.value = ""
            }
        }
    });
    socket.on('recieve_message',function(data){         // recieving messages and
        console.log('message recieved',data.message);   // add it to the chat box

        let newMessage = $('<li>');

        let messageType = 'other-message';

        if(data.id == myId){
            messageType = 'self-message';       // decideding message type
        }

        newMessage.append($('<span>',{
            'html': data.message
        }));

        newMessage.append($('<br>'));

        // newMessage.append($('<sub>',{
        //     'html' : data.user_name
        // }));

        newMessage.addClass(messageType);

        $('#chat-messages-list').append(newMessage);

        // Adding Automatic Scrolling on Recieving or sending Messages
        const chatList = document.getElementById('chat-messages-list');
        chatList.scrollTop = chatList.scrollHeight - chatList.clientHeight;
    });

    // function called when a new user entered in a room
    function connectToNewUser(userId,stream){
        const call = myPeer.call(userId,stream);
        const video = document.createElement('video');
        if(chat){
            video.classList.add('m-top');
        }
        else{
            video.classList.add('m-topless');
        }
        call.on('stream',function(userVideoStream){
            streamVideo(video,userVideoStream);
        });
        call.on('close',function(){
            video.remove();
        });

        peers[userId] = call;
    }
    
    // function for stream user video on screen
    function streamVideo(video,stream){
        video.srcObject = stream;
        video.addEventListener('loadedmetadata',function(){
            video.play();
        }); 
        videoBox.append(video);
    }
})