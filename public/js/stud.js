import * as functions from "./functions.js";
$(document).ready(function(){
    const socket=io();
    //chat
    socket.on('chatMSG',(data)=>{
        $("#msg-block").append(`<div class="col-11 mx-4 msg">
                                    <p>${data.user} [${data.date}]</p>
                                    <p>${data.msg}</p>
                                </div>`);
        var chatHistory=document.getElementById("msg-block");
        chatHistory.scrollTop=chatHistory.scrollHeight;
    });
});