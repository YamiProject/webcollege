import * as functions from "./functions.js";
$(document).ready(function(){
    //main_Page
    //Ссылки
    $("#t-mg-link").on('click', function(){
        window.location.href="/t/mygroup";
    });
    $("#t-al-link").on('click', function(){
        window.location.href="/t/newattendance";
    });
    $("#t-ep-link").on('click', function(){
        window.location.href="/t/mygroup/events";
    });
    $("#t-r-link").on('click', function(){
        window.location.href="/t/newreport";
    });
    $("#t-l-link").on('click', function(){
        window.location.href="/t/announcements";
    });
    //announcements
    //Публикация объявлений
    $("#t-anouncement-form-sumbit").on('click', async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text','textarea','select'])==true){
            let formData=new FormData();
            $.each($("#t-anouncement-form-file")[0].files,function(i,file){
                formData.append('file', file);
            });
            formData.append("head",functions.escapeHTML($("#t-anouncement-form-head").val()));
            formData.append("type",functions.escapeHTML($("#t-anouncement-form-type").val()),);
            formData.append("text",functions.escapeHTML($("#t-anouncement-form-text").val()));
            await $.ajax({
                type:"POST",
                url:"/t/announcements",
                data: formData,
                contentType: false,
                processData: false,
                success: async function(path){
                    if($(".t-announcement-page").html().indexOf(`<h2 class="display-4 pt-5">Нет объявлений!</h2>`)>0){
                        await $(".t-announcement-block").html("");
                    }
                    if(path==""){
                        $(".t-announcement-block").prepend(`
                        <article class="col-xl-8 col-11 row justify-content-center d-none">
                            <div class="col-xl-11 col-12 row justify-content-center">
                                <div class="col-12">
                                    <div class="col-12 t-announcement-header">
                                        <h2 class="col-12 text-center">${functions.escapeHTML($("#t-anouncement-form-head").val())}</h2>
                                    </div>
                                </div>
                                <div class="col-xl-10 col-4 row t-announcement-info">
                                    <div class="col-xl-4 col-12">
                                        <label class="col-12 text-center">${functions.dateNormalise($.now(),"D/M/Y h:m")}</label>
                                    </div>
                                    <div class="col-xl-8 col-12">
                                        <label class="col-12 text-center">${$("#t-anouncement-form-type").find('option:selected').text()}</label>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-8 t-announcement-text">
                                    <p class="col">${functions.escapeHTML($("#t-anouncement-form-text").val())}</p>
                                </div>
                            </div>  
                        </article>`
                        );
                    }
                    else{
                        $(".t-announcement-block").prepend(`
                        <article class="col-xl-8 col-11 row justify-content-center d-none">
                            <div class="col-xl-11 col-12 row justify-content-center">
                                <div class="col-12">
                                    <div class="col-12 t-announcement-header">
                                        <h2 class="col-12 text-center">${functions.escapeHTML($("#t-anouncement-form-head").val())}</h2>
                                    </div>
                                </div>
                                <div class="col-xl-10 col-4 row t-announcement-info">
                                    <div class="col-xl-4 col-12">
                                        <label class="col-12 text-center">${functions.dateNormalise($.now(),"D/M/Y h:m")}</label>
                                    </div>
                                    <div class="col-xl-8 col-12">
                                        <label class="col-12 text-center">${$("#t-anouncement-form-type").find('option:selected').text()}</label>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-8 t-announcement-text">
                                    <p class="col">${functions.escapeHTML($("#t-anouncement-form-text").val())}</p>
                                </div>
                                <div class="col-12 row justify-content-end">
                                    <div class="col-4 row justify-content-center">
                                        <a href="${path}" class="t-announcement-download col-12 text-center text-black-50" download>Вложение</a>
                                    </div>
                                </div>
                            </div>  
                        </article>`
                        );        
                    }
                    $(".t-announcement-block .d-none").fadeOut().delay(1111).removeClass("d-none").fadeIn();
                }
            });
            functions.clear($(this));
        }
    });
    //mygroup
    //Получение быстрого доступа к данным студента группы
    $("#с-my-group-fast-form").on('click',function(){
        window.location.href=`/t/student/${$("#t-my-group-fast-form-student").val()}/${$("#с-my-group-fast-form-type").val()}`;
    });
    //Перехо на страницу студента
    $(".t-student-block").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id")}`;
    });
    //student
    //Ссылки
    $(".t-student-sections>div[id^=t-st-dot-link]").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id").substr(-1)}/documents`;
    });
    $(".t-student-sections>div[id^=t-st-ach-link]").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id").substr(-1)}/achievements`;
    });
    $(".t-student-sections>div[id^=t-st-ae-link]").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id").substr(-1)}/additionaleducation`;
    });
    $(".t-student-sections>div[id^=t-st-abs-link]").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id").substr(-1)}/absenteeismes`;
    });
    //achievements
    //Превью грамоты
    $("#t-achievements-form-file").on('change',function(e){
        $("#t-achievements-form-img").css("background",`url('${URL.createObjectURL(e.target.files[0])}')`);
    });
    //Добавление
    $(".t-achievements-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text',':input:file'])==true){
            let formData=new FormData();
            $.each($("#t-achievements-form-file")[0].files,function(i,file){
                formData.append('file', file);
            });
            formData.append("name",functions.escapeHTML($("#t-achievements-form-name").val()));
            let url=window.location.href.match(/\/t\/student\/\d\/achievements/i);
            await $.ajax({
                type:"POST",
                url:url,
                data: formData,
                contentType: false,
                processData: false,
                success: async function(){
                    window.location.reload();
                }
            });
            functions.clear($(this));
        }
    });
    //Отправка достижений
    //newreport
    //Отправка докладной
    $("#t-report-form-submit").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select','textarea'])==true){
            $.ajax({
                type:"POST",
                url:"/t/newreport",
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