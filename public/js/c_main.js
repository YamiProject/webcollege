import * as functions from "./functions.js";
$(document).ready(function(){
    //main_Page
    $("#mg-link").on('click', function(){
        window.location.href="/mygroup";
    });
    $("#al-link").on('click', function(){
        window.location.href="/newattendance";
    });
    $("#ep-link").on('click', function(){
        window.location.href="/mygroupnewevent";
    });
    $("#r-link").on('click', function(){
        window.location.href="/newreport";
    });
    $("#l-link").on('click', function(){
        window.location.href="/announcements";
    });
    //announcements
    $("#anouncement-form-sumbit").on('click', function(e){
        e.preventDefault();
        if(functions.filledCheck($(this))==true){
            $.ajax({
                type:"POST",
                url:"/announcements",
                data:{
                    head:functions.escapeHTML($("#anouncement-form-head").val()),
                    type:functions.escapeHTML($("#anouncement-form-type").val()),
                    file:functions.escapeHTML($("#anouncement-form-file").val()),
                    text:functions.escapeHTML($("#anouncement-form-text").val())
                },
                success: function(){
                    $(".announcement-block").prepend(`
                    <article class="col-xl-8 col-11 row justify-content-center">
                        <div class="col-xl-11 col-12 row justify-content-center">
                            <div class="col-12">
                                <div class="col-12 announcement-header">
                                    <h2 class="col-12 text-center display-4">${escapeHTML($("#anouncement-form-head").val())}</h2>
                                </div>
                            </div>
                            <div class="col-xl-10 col-4 row announcement-info">
                                <div class="col-xl-4 col-12">
                                    <label class="col-12 text-center">${$.now()}</label>
                                </div>
                                <div class="col-xl-8 col-12">
                                    <label class="col-12 text-center">${escapeHTML($("#anouncement-form-type").val())}</label>
                                </div>
                            </div>
                            <div class="col-xl-12 col-8 announcement-text">
                                    <p class="col">${escapeHTML($("#anouncement-form-text").val())}</p>
                            </div>
                        </div>  
                    </article>
                    `
                    );
                }
            });
        }
    });
});