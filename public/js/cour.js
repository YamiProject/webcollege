import * as functions from "./functions.js";
$(document).ready(function(){
    //main_Page
    $("#mg-link").on('click', function(){
        window.location.href="/c/mygroup";
    });
    $("#al-link").on('click', function(){
        window.location.href="/c/newattendance";
    });
    $("#ep-link").on('click', function(){
        window.location.href="/c/mygroup/newevent";
    });
    $("#r-link").on('click', function(){
        window.location.href="/c/newreport";
    });
    $("#l-link").on('click', function(){
        window.location.href="/c/announcements";
    });
    //announcements
    $("#anouncement-form-sumbit").on('click', async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text','textarea','select'])==true){
            await $.ajax({
                type:"POST",
                url:"/c/announcements",
                data:{
                    head:functions.escapeHTML($("#anouncement-form-head").val()),
                    type:functions.escapeHTML($("#anouncement-form-type").val()),
                    file:functions.escapeHTML($("#anouncement-form-file").val()),
                    text:functions.escapeHTML($("#anouncement-form-text").val())
                },
                success: async function(){
                    if($(".c-announcement-page").html().indexOf(`<h2 class="display-4 pt-5">Нет объявлений!</h2>`)>0){
                        await $(".announcement-block").html("");
                    }
                    $(".announcement-block").prepend(`
                    <article class="col-xl-8 col-11 row justify-content-center d-none">
                        <div class="col-xl-11 col-12 row justify-content-center">
                            <div class="col-12">
                                <div class="col-12 announcement-header">
                                    <h2 class="col-12 text-center display-4">${functions.escapeHTML($("#anouncement-form-head").val())}</h2>
                                </div>
                            </div>
                            <div class="col-xl-10 col-4 row announcement-info">
                                <div class="col-xl-4 col-12">
                                    <label class="col-12 text-center">${$.now()}</label>
                                </div>
                                <div class="col-xl-8 col-12">
                                    <label class="col-12 text-center">${$("#anouncement-form-type").find('option:selected').text()}</label>
                                </div>
                            </div>
                            <div class="col-xl-12 col-8 announcement-text">
                                    <p class="col">${functions.escapeHTML($("#anouncement-form-text").val())}</p>
                            </div>
                        </div>  
                    </article>`
                    );
                    $(".announcement-block .d-none").fadeOut().delay(1111).removeClass("d-none").fadeIn();
                }
            });
            functions.clear($(this));
        }
    });
    //mygroup
    $(".student-block").on('click', function(){
        window.location.href=`/c/student/${$(this).attr("id")}`;
    });
    //newreport
    $("#report-form-submit").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select','textarea'])==true){
            $.ajax({
                type:"POST",
                url:"/c/newreport",
                data:{
                    group_id:functions.escapeHTML($("#report-form-group-select").val()),
                    text:functions.escapeHTML($("#report-form-text").val())
                },
                success: function(){
                    $("#new-report-block").hide()
                    .html(`
                        <div class="col-12>
                            <h2>Докладная отправлена!</h2>
                        </div>
                        <div>
                            <button>Составить новую</button>
                            <button>Вернутся на главную страницу</button>
                        </div>`)
                    .delay(1000)
                    .fadeIn();
                }
            });
        }
    });
});