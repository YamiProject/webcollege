import * as functions from "./functions.js";
$(document).ready(function(){
    $("#error-back-main").on('click', function(){
        window.location.href="/";
    });
    $("#error-back,.back-button").on('click', function(){
        history.back();
    });
    $("#login-form-submit").on('click',async function(e){
        e.preventDefault();
        if(await functions.filledCheck($(this),[':input:text'])==true){
            $.ajax({
                type:"POST",
                url: "/welcomepage",
                data:{
                    user_login:functions.escapeHTML($("#user-login").val()),
                    user_password:functions.escapeHTML($("#user-password").val())
                },
                success: function(answer){
                    if(answer=="Succsess"){
                        window.location.reload();
                    }
                    else{
                        alert("Пользователя не существует!");
                    }
                }
            });
        }
    })
    $("#navbar a").hover(function(){
        $(this).animate({paddingTop:"+=10px"},200);
    },function(){
        $(this).animate({paddingTop:"-=10px"},200);
    });
    //Обнуление состояния ошибки
    $("input,textarea,select").on('click', function(){
        $(this).removeClass("border-danger");
    });    
    /*$(".close-button").hover(function(){
        $(this).animate({width:"+=20px",paddingLeft:"+=10px"},200);
    },function(){
        $(this).animate({width:"-=20px",paddingLeft:"-=10px"},200);
    });
   $(".close-button").on('click',function(){
        $("#sidebar").animate({width:"0"},400);
        $(".close-button").animate({left:"-=330px"},400);
        $(".main").animate({left:"0",width:"100.8%"},400)
    });*/
});