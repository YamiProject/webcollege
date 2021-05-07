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
    //absentismeses
    $("#s-absentismeses-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),["input:file"])==true){
            let formData=new FormData();
            await $.each($("#s-st-absentismeses-form-file")[0].files,function(i,file){
                formData.append('file',file);
            });
            formData.append("id",$(this).closest("form").attr("id").match(/\d+/));
            $.ajax({
                type:"POST",
                url:"/s/absenteeismes",
                data:formData,
                contentType:false,
                processData:false,
                success: function(){
                    window.location.reload();
                }
            })
        }
    });
    //documents
    $("#s-st-pas-form-sir,#s-st-pas-form-num,#s-oth-document-number").on('keypress keyup keydown',function(){
        if($(this).val().search(/\D/gi)>=0){
            $(this).val($(this).val().slice(0,-1));
        }
    });
    //Добавление данных документов
    $("#s-doc-save").on('click',async function(e){
        e.preventDefault();
        let formData=new FormData();
        let accs=true;
        let accs_file=[];
        await $.each($("form #s-oth-document-number"),function(){
            if($(this).val().trim()!==''){
                switch($(this).attr("name")){
                    case "СНИЛС":
                        if($(this).val().length==11){
                            accs_file.push($(this).attr("name"));
                            formData.append($(this).attr("name"),$(this).val());
                        }
                        else{
                            accs=false;
                            $(this).addClass("text-danger border-danger");
                        }
                        break;
                    case "ИНН":
                        if($(this).val().length==10){
                            accs_file.push($(this).attr("name"));
                            formData.append($(this).attr("name"),$(this).val());
                        }
                        else{
                            accs=false;
                            $(this).addClass("text-danger border-danger");
                        }
                        break;
                    case "ПОЛИС":
                        if($(this).val().length==10){
                            accs_file.push($(this).attr("name"));
                            formData.append($(this).attr("name"),$(this).val());
                        }
                        else{
                            accs=false;
                            $(this).addClass("text-danger border-danger");
                        }
                        break;
                }
            }
        });
        await $.each($("form #s-oth-document-scan"),function(){
            if(accs_file.includes($(this).attr("name"))){
                let scan_name=$(this).attr("name");
                $.each($(this)[0].files,function(i,file){
                   formData.append(scan_name+"_scan",file); 
                });
            }
        });
        let pasp=false;
        let pasp_array={};
        await $.each($("#s-pas-data-block input:text,#s-pas-data-block input[type='date']"),function(){
            if($(this).val().trim()!==''){
                pasp=true;
                formData.append("passport_"+$(this).attr("id").replace("s-pas-form-",''),$(this).val());
            }
            else{
                $(this).addClass("text-danger border-danger");
                accs=false;
            }
        });
        if(pasp==true){
            await $.each($("#s-pas-form-scan")[0].files,function(i,file){
                formData.append("passport_scan",file);
            });
        }
        if(accs==true){
            $.ajax({
                type:"POST",
                url:"/s/documents",
                data:formData,
                contentType:false,
                processData:false,
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //duty
    $(".s-duty-form-button").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select'])==true){
            if($("#s-duty-f-s").val()!==$("#s-duty-s-s").val()){
                $.ajax({
                    type:"POST",
                    url:"/s/duty",
                    data:{
                        f_student:functions.escapeHTML($("#s-duty-f-s").val()),
                        s_student:functions.escapeHTML($("#s-duty-s-s").val())
                    },
                    success: function(){
                        window.location.reload();
                    }
                })
            }
            else{
                $("#s-duty-f-s, #s-duty-s-s").addClass("border-danger");
            }
        }
    });
    //gallery
    $("#s-gallery-form-button").on('click',async function(){
        if(functions.filledCheck($(this),['input'])==true){
            let formData=new FormData();
            await $.each($('#s-gallery-form-file')[0].files,function(i,file){
                formData.append(file.name,file);
            });
            $.ajax({
                type:"POST",
                url:'/s/groupgallery',
                data:formData,
                contentType:false,
                processData:false,
                success:function(){
                    window.location.reload();
                }
            });
        }
    });
    $(".s-gallery-block img[id^=IMG_]").on('click',function(){
        $("#s-gallery-show-img").attr("src",$(this).attr("src"));
    });
});