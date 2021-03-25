import * as functions from "./functions.js";
$(document).ready(function(){
    $("#login-form-sumbit").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this))==true){
            $.ajax({
                type:"POST",
                url:"/authorisation",
                data:{
                    user_login: functions.escapeHTML($("#user-login").val()),
                    user_password: functions.escapeHTML($("#user-password").val())
                },
                succsess: function(){
                    window.location.reload();
                }
            });
        }
    })
    $("#navbar a").hover(function(){
        $(this).animate({paddingTop:"+=10px"},200);
    },function(){
        $(this).animate({paddingTop:"-=10px"},200);
    });
     /*
    $(".close-button").hover(function(){
        $(this).animate({width:"+=20px",paddingLeft:"+=10px"},200);
    },function(){
        $(this).animate({width:"-=20px",paddingLeft:"-=10px"},200);
    });
   $(".close-button").on('click',function(){
        $("#sidebar").animate({width:"0"},400);
        $(".close-button").animate({left:"-=330px"},400);
        $(".main").animate({left:"0",width:"100.8%"},400)
    });
    $()*/
    //Обнуление состояния ошибки
    $(":input:text,textarea").on('click', function(){
        $(this).removeClass("border-warning");
    });
});