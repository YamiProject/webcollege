import * as functions from "./functions.js";
$(document).ready(function(){
    //profile
    //options
    //Возвращение опций по умолчанию
    $("#default-options-button").on('click', function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/options",
            data:{
                change:'default'
            },
            success: function(){
                window.location.reload();
            }
        });
    });
    //Сохранение опций после изменения
    $("#save-options-button").on('click', function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"/options",
            data:{
                change:'new',
                h_size:functions.escapeHTML($("#opt-h-size").val()),
                h_color:functions.escapeHTML($("#opt-h-color").val()),
                font_size:functions.escapeHTML($("#opt-font-size").val()),
                font_color:functions.escapeHTML($("#opt-font-color").val()),
                theme_id:functions.escapeHTML($("#opt-theme").val()),
                logo_d:$("#opt-logo-d").prop("checked"),
                app_name_d:$("#opt-app-name-d").prop("checked"),
            },
            success: function(){
                window.location.reload();
            }
        });
    });
    //error
    //Возвращение на главную страницу
    $("#error-back-main").on('click', function(){
        window.location.href="/";
    });
    //Возвращение на предыдущую страницу
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
                    if(answer=="Success"){
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
    //Анимация кнопок меню навигации
    $("#navbar a").hover(function(){
        $(this).animate({paddingTop:"-=10px"},200);
    },function(){
        $(this).animate({paddingTop:"+=10px"},200);
    });
    //Обнуление состояния ошибки
    $("input,textarea,select").on('click', function(){
        $(this).removeClass("border-danger text-danger");
    });
    //sidebar (открытие и закрытие)
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
    //sideform (открытые и закрытие)
    $(".open-form-button").on('click',function(){
        $(".open-form-button").prop("disabled",true).removeClass("open-form-button-selector");
        $(".close-sideform").prop("disabled",false);
        $("#side-form").animate({width:"+=25%"});
        $(".block-to-slide").animate({width:"-=25%"});
        $(".h-of h1").toggleClass("d-none");
    });
    $(".close-sideform").on('click',function(){
        $(".open-form-button").prop("disabled",false).addClass("open-form-button-selector");
        $(".close-sideform").prop("disabled",true);
        $("#side-form").animate({width:"-=25%"});
        $(".block-to-slide").animate({width:"+=25%"});
        $(".h-of h1").toggleClass("d-none");
    });
});