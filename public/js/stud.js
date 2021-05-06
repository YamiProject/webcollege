import * as functions from "./functions.js";
$(document).ready(function(){
    if(window.location.href.indexOf("/s/chat")>0){
        $("#msg-block").scrollTop(`${$("#msg-block")[0].scrollHeight}`);
    }
    //Подгрузка
    var load=true;
    $(window).on('scroll',function(e){
        e.preventDefault();
        if($(this).scrollTop()>parseInt($("#s-announcement-block")[0].scrollHeight-700)){
            if(load==true){
                load=false;
                if(window.location.href.indexOf("/s/announcements")>0){
                    $.ajax({
                            type:"POST",
                            url:"/announcements_load",
                            data:{
                                count:$("#s-announcement-block>article").length
                            },
                            success: async function(data){
                                await $("#s-announcement-block").append(data);
                                load=true;
                            }
                    });
                }
            }
        }
    });
    $("#msg-block").on('scroll',function(e){
        e.preventDefault();
        if($("#msg-block").scrollTop()==0){
            if(load==true){
                load=false;
                let scrollHeight=$("#msg-block")[0].scrollHeight;
                $.ajax({
                    type:"POST",
                    url:"/chat_load",
                    data:{
                        count:$("#msg-block>div").length
                    },
                    success: async function(data){
                        await $("#msg-block").prepend(data);
                        $("#msg-block").scrollTop($("#msg-block")[0].scrollHeight-scrollHeight);
                        load=true;
                    }
            });
            }
        }
    })
    const socket=io();
    //main_Page
    //Ссылки
    $("#s-an-link").on('click', function(){
        window.location.href="/s/announcements";
    });
    $("#s-ch-link").on('click', function(){
        window.location.href="/s/chat";
    });
    $("#s-ach-link").on('click', function(){
        window.location.href="/s/achievements";
    });
    $("#s-doc-link").on('click', function(){
        window.location.href="/s/documents";
    });
    $("#s-abs-link").on('click', function(){
        window.location.href="/s/absenteeismes";
    });
    $("#s-do-link").on('click', function(){
        window.location.href="/s/additionaleducation";
    });
    //chat
    socket.on('addChatMSG',(data)=>{
        $("#chatmbox").val("");
        $("#msg-block").append(`<div class="col-11 mx-4 msg">
                                    <p>${data.user} [${data.date}]</p>
                                    <p>${data.msg}</p>
                                </div>`);
        var chatHistory=document.getElementById("msg-block");
        chatHistory.scrollTop=chatHistory.scrollHeight;
    });
    $(".chatsubmbutton").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['textarea'])){
            var url=window.location.href.match(/\/[t|s]\/chat/i);
            $.ajax({
                type:"POST",
                url:url,
                data:{
                    msg:await functions.escapeHTML($("#chatmbox").val())
                },
                success: async function(){
                    socket.emit('newChatMessage',await functions.escapeHTML($("#chatmbox").val()));
                }
            });    
        }
    });
    //events
    //Фильтрация
    $(".s-event-filter-button").on('click',function(e){
        e.preventDefault();
        if($("#s-form-filter-pr").prop("checked")==true){
            $(".s-event-type-pr").prop("hidden",false);
        }
        else{
            $(".s-event-type-pr").prop("hidden",true);
        }
        if($("#s-form-filter-oe").prop("checked")==true){
            $(".s-event-type-oe").prop("hidden",false);
        }
        else{
            $(".s-event-type-oe").prop("hidden",true);
        }
        if($("#s-form-filter-sut").prop("checked")==true){
            $(".s-event-type-sut").prop("hidden",false);
        }
        else{
            $(".s-event-type-sut").prop("hidden",true);
        }
        if($("#s-form-filter-fut").prop("checked")==true){
            $(".s-event-type-fut").prop("hidden",false);
        }
        else{
            $(".s-event-type-fut").prop("hidden",true);
        }
        if($("#s-form-filter-pas").prop("checked")==true){
            $(".s-event-type-pas").prop("hidden",false);
        }
        else{
            $(".s-event-type-pas").prop("hidden",true);
        }
    });
    //achievements
    $("#s-achievements-form-file").on('change',function(e){
        $("#s-achievements-form-img").css("background",`url('${URL.createObjectURL(e.target.files[0])}')`);
    });
    //Добавление
    $(".s-achievements-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text',':input:file'])==true){
            let formData=new FormData();
            await $.each($("#s-achievements-form-file")[0].files,function(i,file){
                formData.append('file', file);
            });
            alert(functions.escapeHTML($("#s-achievements-form-name").val()));
            formData.append("name",functions.escapeHTML($("#s-achievements-form-name").val()));
            await $.ajax({
                type:"POST",
                url:"/s/achievements",
                data: formData,
                contentType: false,
                processData: false,
                success: async function(){
                    window.location.reload();
                }
            });
        }
    });
});