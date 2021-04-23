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
            await $.each($("#t-anouncement-form-file")[0].files,function(i,file){
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
    //documents
    $("#t-st-pas-form-sir, #t-st-pas-form-num").on('keypress keyup keydown',function(){
        if($(this).val().search(/\D/gi)>=0){
            $(this).val($(this).val().slice(0,-1));
        }
    });
    //Добавление пасспортных данных
    $(".t-st-pas-form-save-button").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['input:text','input[type="date"]'])==true&&
        $("#t-st-pas-form-sir").val().length==4&&
        $("#t-st-pas-form-num").val().length==6){
            let url=window.location.href.match(/\/t\/student\/\d\/documents/i);
            let formData=new FormData();
            formData.append('siries',$("#t-st-pas-form-sir").val());
            formData.append('number',$("#t-st-pas-form-num").val());
            formData.append('by',$("#t-st-pas-form-by").val());
            formData.append('date',$("#t-st-pas-form-date").val());
            formData.append('lp',$("#t-st-pas-form-lp").val());
            formData.append('document','passport');
            if($("#t-st-pas-form-scan").val()!==''){
                $.each($("#t-st-pas-form-scan")[0].files,function(i,file){
                    formData.append('scan',file);
                });
            }
            $.ajax({
                type:"POST",
                url:url,
                data:formData,
                processData:false,
                contentType:false,
                success:function(){
                    window.location.reload();
                }
            });
        }
    });
    //Добавление
    $(".t-achievements-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text',':input:file'])==true){
            let url=window.location.href.match(/\/t\/student\/\d\/achievements/i);
            let formData=new FormData();
            await $.each($("#t-achievements-form-file")[0].files,function(i,file){
                formData.append('file', file);
            });
            formData.append("name",functions.escapeHTML($("#t-achievements-form-name").val()));
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
        }
    });
    //st-absentismeses
    //Отправка объяснитльной
    $("#t-st-absentismeses-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),["input:file"])==true){
            let url=window.location.href.match(/\/t\/student\/\d\/absenteeismes/i);
            let formData=new FormData();
            await $.each($("#t-st-absentismeses-form-file")[0].files,function(i,file){
                formData.append('file',file);
            });
            formData.append("id",$(this).closest("form").attr("id").match(/\d+/));
            $.ajax({
                type:"POST",
                url:url,
                data:formData,
                contentType:false,
                processData:false,
                success: function(){
                    window.location.reload();
                }
            })
        }
    });
    //attendance
    $("#t-my-group-na-link").on('click',function(){
        window.location.href="/t/newattendance";
    });
    $("#t-attendance-list>div[id^=att-]").on('click',function(){
        window.location.href=`/t/mygroup/attendance/${$(this).attr("id").replace("att-",'')}`;
    });
    //attendance-info
    $(".t-abs-student-block").on('click',function(){
        window.location.href=`/t/student/${$(this).attr("id")}/absenteeismes`;
    });
    //newattendance
    //Включение доступа загрузки файлов
    $("#t-new-attendance-form select").on('change',function(){
        if($(this).val()=="Н"||$(this).val()=="З"){
            $(`#t-new-attendance-form-file-${$(this).attr("id").replace(/t-new-attendance-form-select-/i,'')}`).prop("disabled",false);
        }
        else{
            $(`#t-new-attendance-form-file-${$(this).attr("id").replace(/t-new-attendance-form-select-/i,'')}`).prop("disabled",true);
        }
    })
    //Отправка посещаемости
    $("#t-new-attendance-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),["input[type='date']"])==true){
            let formData=new FormData();
            formData.append("date",await functions.dateNormalise($("#t-new-attendance-form-date").val(),"Y-M-D"));
            let id;
            let abs_array=[];
            await $.each($("#t-new-attendance-form select"),async function(){
                if($(this).val()!==""&&$(this).val()!==null){
                    id=$(this).attr("id").replace(/t-new-attendance-form-select-/,'');
                    formData.append(id,$(this).val());
                    abs_array.push(id);
                }
            });
            await $.each($("#t-new-attendance-form input:file"),function(){
                id=$(this).attr("id").replace(/t-new-attendance-form-file-/,'');
                if(abs_array.includes(id)){
                    $.each($(this)[0].files,function(i,file){
                        if(file!==""&&file!=='null'&&typeof file!=='undefined'){
                            formData.append(id,file);
                        }
                    });
                }
            });
            $.ajax({
                type:"POST",
                url:"/t/newattendance",
                data:formData,
                contentType:false,
                processData:false,
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //event
    //Фильтрация
    $(".t-event-filter-button").on('click',function(e){
        e.preventDefault();
        if($("#t-form-filter-pr").prop("checked")==true){
            $(".t-event-type-pr").prop("hidden",false);
        }
        else{
            $(".t-event-type-pr").prop("hidden",true);
        }
        if($("#t-form-filter-oe").prop("checked")==true){
            $(".t-event-type-oe").prop("hidden",false);
        }
        else{
            $(".t-event-type-oe").prop("hidden",true);
        }
        if($("#t-form-filter-sut").prop("checked")==true){
            $(".t-event-type-sut").prop("hidden",false);
        }
        else{
            $(".t-event-type-sut").prop("hidden",true);
        }
        if($("#t-form-filter-fut").prop("checked")==true){
            $(".t-event-type-fut").prop("hidden",false);
        }
        else{
            $(".t-event-type-fut").prop("hidden",true);
        }
        if($("#t-form-filter-pas").prop("checked")==true){
            $(".t-event-type-pas").prop("hidden",false);
        }
        else{
            $(".t-event-type-pas").prop("hidden",true);
        }
    });
    //Создание нового мероприятия
    $(".t-event-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select','input','textarea'])==true){
            await $.ajax({
                type:"POST",
                url:"/t/mygroup/events",
                data:{
                    event_type:functions.escapeHTML($("#t-event-form-select").val()),
                    event_discr:functions.escapeHTML($("#t-event-form-textarea").val()),
                    event_date:functions.escapeHTML($("#t-event-form-date").val())
                },
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //individual work
    //newreport
    //Отправка докладной
    $("#t-report-form-submit").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select','textarea'])==true){
            await $.ajax({
                type:"POST",
                url:"/t/newreport",
                data:{
                    group_id:functions.escapeHTML($("#t-report-form-group-select").val()),
                    text:functions.escapeHTML($("#t-report-form-text").val())
                },
                success: function(){
                    $("#new-report-block").hide()
                    .html(`
                        <div class="col-12>
                            <h2>Докладная отправлена!</h2>
                        </div>
                        <div class="col-12 row justify-content-around">
                            <button class="btn stylise-block col-5" onclick="window.location.reload()">Составить новую</button>
                            <button class="btn stylise-block col-5" onclick="window.location.href='/'">Вернутся на главную страницу</button>
                        </div>`)
                    .delay(1000)
                    .fadeIn();
                }
            });
        }
    });
    //t_gallery
    $("#t-gallery-form-button").on('click',async function(){
        if(functions.filledCheck($(this),['input'])==true){
            let formData=new FormData();
            await $.each($('#t-gallery-form-file')[0].files,function(i,file){
                formData.append(file.name,file);
            });
            $.ajax({
                type:"POST",
                url:'/t/mygroup/gallery',
                data:formData,
                contentType:false,
                processData:false,
                success:function(){
                    window.location.reload();
                }
            });
        }
    });
});