import * as functions from "./functions.js";
$(document).ready(function(){
    //error
    $("#error-back-main").on('click', function(){
        window.location.href="/";
    });
    $("#error-back,.back-button").on('click', function(){
        history.back();
    });
    //Авторизация
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
    //Стилизация меню
    $("#navbar a").hover(function(){
        $(this).animate({paddingTop:"-=10px"},200);
    },function(){
        $(this).animate({paddingTop:"+=10px"},200);
    });
    //Обнуление состояния ошибки
    $("input,textarea,select").on('click', function(){
        $(this).removeClass("border-danger");
    });
    //sidebar
    $(".sidebar-close-button").on('click',function(e){
        e.preventDefault();
        if($(".sidebar-close-button").hasClass("sidebar-close-action")){
            $("#sidebar").animate({width:"0"});
            $(".sidebar-close-button").animate({left:"-=330px"});
            $(".sidebar-close-button").removeClass("sidebar-close-action").addClass("sidebar-open-action").html('<label>&gt;&gt;&gt;</label>');
            $(".main, #header").animate({left:"0",width:"+=330px"});
            $(".block-app-logo").animate({left:"-=8%"});
            $.ajax({
                type:"POST",
                url:"/cookies",
                data:{
                    action:"s_off"
                }
            });
        }
        else{
            $(".sidebar-close-button").animate({left:"+=330px"}).removeClass("sidebar-open-action").addClass("sidebar-close-action").html('<label>&lt;&lt;&lt;</label>');
            $("#sidebar").animate({width:"330px"});
            $(".main, #header").animate({left:"330",width:"-=330px"});
            $(".block-app-logo").animate({left:"+=8%"});
            $.ajax({
                type:"POST",
                url:"/cookies",
                data:{
                    action:"s_on"
                }
            });
        }
    });
    $(".sidebar-open-action").on('click',function(){
        
    });
    //sideform
    $(".open-form-button").on('click',function(){
        $(".open-form-button").prop("disabled",true);
        $(".close-sideform").prop("disabled",false);
        $("#side-form").animate({width:"+=25%"});
        $(".block-to-slide").animate({width:"-=25%"});
        $(".h-of h1").toggleClass("d-none");
    });
    $(".close-sideform").on('click',function(){
        $(".open-form-button").prop("disabled",false);
        $(".close-sideform").prop("disabled",true);
        $("#side-form").animate({width:"-=25%"});
        $(".block-to-slide").animate({width:"+=25%"});
        $(".h-of h1").toggleClass("d-none");
    });
});