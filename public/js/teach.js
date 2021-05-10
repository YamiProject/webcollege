import * as functions from "./functions.js";
$(document).ready(function(){
    if(window.location.href.indexOf("/t/chat")>0){
        $("#msg-block").scrollTop(`${$("#msg-block")[0].scrollHeight}`);
    }
    //Подгрузка
    var load=true;
    $(window).on('scroll',function(e){
        e.preventDefault();
        if(window.location.href.indexOf("/t/announcements")>0){
            if($(this).scrollTop()>parseInt($("#t-announcement-block")[0].scrollHeight-500)){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf("/t/announcements")>0){
                        $.ajax({
                            type:"POST",
                            url:"/announcements_load",
                            data:{
                                count:$("#t-announcement-block>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#t-announcement-block").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf("/t/mygroup/events")>0){
            if($(this).scrollTop()>parseInt($(".t-my-group-events")[0].scrollHeight-500)){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf("/t/mygroup/events")>0){
                        $.ajax({
                            type:"POST",
                            url:"/event_load",
                            data:{
                                count:$("#t-event-article-block>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#t-event-article-block").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf("/t/mygroup/individualwork")>0){
            if($(this).scrollTop()>parseInt($(".t-individual-work")[0].scrollHeight-500)){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf("/t/mygroup/individualwork")>0){
                        $.ajax({
                            type:"POST",
                            url:"/iw_load",
                            data:{
                                count:$("#t-iw-article-block>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#t-iw-article-block").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf("/t/mygroup/attendance")>0){
            if($(this).scrollTop()>parseInt($("#t-attendance")[0].scrollHeight-500)){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf("/t/announcements")>0){
                        $.ajax({
                            type:"POST",
                            url:"/attendance_load",
                            data:{
                                count:$("#t-attendance-list>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#t-attendance-list").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf("/t/mygroup/reports")>0){
            if($(this).scrollTop()>parseInt($("#t-reports")[0].scrollHeight-500)){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf("/t/mygroup/reports")>0){
                        $.ajax({
                            type:"POST",
                            url:"/reports_load",
                            data:{
                                count:$("#t-reports-list>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#t-reports-list").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
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
    });
    //Socket
    const socket=io();
    socket.on('addNewAnnounce',(data)=>{
        if(!data.path){
            $("#t-announcement-block").html("");
            $("#t-announcement-block").prepend(`
            <article class="col-xl-8 col-11 row justify-content-center d-none mt-1 mb-5">
                <div class="col-xl-11 col-12 row justify-content-center">
                    <div class="col-12">
                        <div class="col-12 t-announcement-header">
                            <h2 class="col-12 text-center">${data.head}</h2>
                        </div>
                    </div>
                    <div class="col-xl-10 col-4 row t-announcement-info">
                        <div class="col-xl-4 col-12">
                            <label class="col-12 text-center">${data.date}</label>
                        </div>
                        <div class="col-xl-8 col-12">
                            <label class="col-12 text-center">${data.type}</label>
                        </div>
                    </div>
                    <div class="col-xl-12 col-8 t-announcement-text">
                        <p class="col">${data.text}</p>
                    </div>
                </div>  
            </article>`
            );
        }
        else{
            $("#t-announcement-block").prepend(`
            <article class="col-xl-8 col-11 row justify-content-center d-none mt-1 mb-5">
                <div class="col-xl-11 col-12 row justify-content-center">
                    <div class="col-12">
                        <div class="col-12 t-announcement-header">
                            <h2 class="col-12 text-center">${data.head}</h2>
                        </div>
                    </div>
                    <div class="col-xl-10 col-4 row t-announcement-info">
                        <div class="col-xl-4 col-12">
                            <label class="col-12 text-center">${data.date}</label>
                        </div>
                        <div class="col-xl-8 col-12">
                            <label class="col-12 text-center">${data.type}</label>
                        </div>
                    </div>
                    <div class="col-xl-12 col-8 t-announcement-text">
                        <p class="col">${data.text}</p>
                    </div>
                    <div class="col-12 row justify-content-end">
                        <div class="col-4 row justify-content-center">
                            <a href="${data.path}" class="t-announcement-download col-12 text-center text-black-50" download>Вложение</a>
                        </div>
                    </div>
                </div>  
            </article>`
            );        
        }
        $("#t-announcement-block .d-none").fadeOut().delay(1111).removeClass("d-none").fadeIn();
    });
    socket.on('stDocReload',()=>{
        window.location.reload();
    });
    socket.on('stAchiReload',()=>{
        window.location.reload();
    });
    socket.on('stAddEddReload',()=>{
        window.location.reload();
    });
    socket.on('stAbsReload',()=>{
        window.location.reload();
    });
    socket.on('stIwReload',()=>{
        window.location.reload();
    });
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
    //Публикация объявлений (доделать)
    $(".t-announcement-form-button").on('click', async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),[':input:text','textarea','select'])==true){
            let formData=new FormData();
            await $.each($("#t-anouncement-form-file")[0].files,function(i,file){
                formData.append('file', file);
            });
            formData.append("head",functions.escapeHTML($("#t-anouncement-form-head").val()));
            formData.append("type",functions.escapeHTML($("#t-anouncement-form-type").val()));
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
                    socket.emit('newAnnounce',{
                        head:functions.escapeHTML($("#t-anouncement-form-head").val()),
                        type:functions.escapeHTML($("#t-anouncement-form-type").val()),
                        text:functions.escapeHTML($("#t-anouncement-form-text").val()),
                        path:path
                    });
                }
            });
            functions.clear($(this));
        }
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
    //mygroup
    //Получение быстрого доступа к данным студента группы
    $("#t-my-group-fast-form-button").on('click',function(){
        if(functions.filledCheck($(this),['select'])==true){
            window.location.href=`/t/student/${$("#t-my-group-fast-form-student").val()}/${$("#t-my-group-fast-form-type").val()}`;
        }
    });
    //Перехо на страницу студента
    $(".t-student-block").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id")}`;
    });
    //student
    $("#t-st-makehead").on('click',function(){
        let url=window.location.href.match(/\/t\/student\/\d/i);
        $.ajax({
            type:"POST",
            url:url,
            success: function(){
                window.location.reload();
            }
        })
    });
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
    $(".t-student-sections>div[id^=t-st-ind-link]").on('click', function(){
        window.location.href=`/t/student/${$(this).attr("id").substr(-1)}/individualwork`;
    });
    //documents
    $("#t-st-pas-form-sir,#t-st-pas-form-num,#t-oth-document-number").on('keypress keyup keydown',function(){
        if($(this).val().search(/\D/gi)>=0){
            $(this).val($(this).val().slice(0,-1));
        }
    });
    //Добавление данных документов
    $("#t-st-doc-save").on('click',async function(e){
        e.preventDefault();
        let formData=new FormData();
        let accs=true;
        let accs_file=[];
        await $.each($("form #t-oth-document-number"),function(){
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
        await $.each($("form #t-oth-document-scan"),function(){
            if(accs_file.includes($(this).attr("name"))){
                let scan_name=$(this).attr("name");
                $.each($(this)[0].files,function(i,file){
                   formData.append(scan_name+"_scan",file); 
                });
            }
        });
        let pasp=false;
        let pasp_array={};
        await $.each($("#t-st-pas-data-block input:text,#t-st-pas-data-block input[type='date']"),function(){
            if($(this).val().trim()!==''){
                pasp=true;
                formData.append("passport_"+$(this).attr("id").replace("t-st-pas-form-",''),$(this).val());
            }
            else{
                $(this).addClass("text-danger border-danger");
                accs=false;
            }
        });
        if(pasp==true){
            await $.each($("#t-st-pas-form-scan")[0].files,function(i,file){
                formData.append("passport_scan",file);
            });
        }
        if(accs==true){
            let url=window.location.href.match(/\/t\/student\/\d\/documents/i);
            $.ajax({
                type:"POST",
                url:url,
                data:formData,
                contentType:false,
                processData:false,
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //Кнопка активного изменения
    //achievements
    //Превью грамоты
    $("#t-achievements-form-file").on('change',function(e){
        $("#t-achievements-form-img").css("background",`url('${URL.createObjectURL(e.target.files[0])}')`);
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
    //additional education
    $("#t-st-ae-form-button").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select'])==true){
            let url=window.location.href.match(/\/t\/student\/\d\/additionaleducation/i);
            $.ajax({
                type:"POST",
                url:url,
                data:{
                    cource_id:functions.escapeHTML($("#t-st-ae-form-selection").val()) 
                },
                success: function(){
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
    //st-iw
    $(".t-st-iw-form-button").on('click',function(){
        if(functions.filledCheck($(this),['select','input','textarea'])==true){
            let url=window.location.href.match(/\/t\/student\/\d\/individualwork/i);
            $.ajax({
                type:"POST",
                url:url,
                data:{
                    iw_type:functions.escapeHTML($("#t-st-iw-form-type").val()),
                    iw_reasone:functions.escapeHTML($("#t-st-iw-form-reasone").val()),
                    iw_date:functions.escapeHTML($("#t-st-iw-form-date").val())
                },
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //attendance
    $("#t-my-group-na-link").on('click',function(){
        window.location.href="/t/newattendance";
    });
    $("#t-my-group-re-link").on('click',function(){
        window.location.href="/t/newreport";
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
                    window.location.href="/t/mygroup/attendance";
                }
            });
        }
    });
    //events
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
    //Перенаправление
    $("#t-my-group-attendance-rep-link").on('click',function(){
        window.location.href="/t/newreport";
    });
    //Создание нового мероприятия
    $(".t-event-form-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select','input','textarea'])==true){
            await $.ajax({
                type:"POST",
                url:"/t/mygroup/events",
                data:{
                    type:"event",
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
    //Включение кнопки
    $("#t-event-event-img-add-input").on('change',function(){
        $(`#${$(this).closest("form").attr("id")} #t-event-event-img-add-input-button`).prop("disabled",false);
    });
    $("#t-event-event-img-add-input-button").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['input'])==true){
            let formData=new FormData();
            await $.each($(`#${$(this).closest("form").attr("id")} #t-event-event-img-add-input`)[0].files,function(i,file){
                formData.append("file",file);
            });
            formData.append("event_id",$(this).closest("form").attr("id").replace(/\D/g,''));
            await $.ajax({
                type:"POST",
                url:"/t/mygroup/events",
                data:formData,
                processData:false,
                contentType:false,
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //individual work
    $("#t-iw-report-link").on('click',function(){
        window.location.href="/t/newreport";
    });
    $(".t-iw-form-button").on('click',function(){
        if(functions.filledCheck($(this),['select','input','textarea'])==true){
            $.ajax({
                type:"POST",
                url:"/t/mygroup/individualwork",
                data:{
                    iw_type:functions.escapeHTML($("#t-iw-form-type").val()),
                    st_id:functions.escapeHTML($("#t-iw-form-student").val()),
                    iw_reasone:functions.escapeHTML($("#t-iw-form-reasone").val()),
                    iw_date:functions.escapeHTML($("#t-iw-form-date").val())
                },
                success: function(){
                    window.location.reload();
                }
            });
        }
    });
    //report
    $("#t-reports-list div[id^=rep-]").on('click',function(){
        window.location.href=`/t/mygroup/report/${$(this).attr("id").replace(/\D/gi,'')}`;
    });
    $("#t-my-group-reports-link").on('click',function(){
        window.location.href="/t/newreport";
    });
    //report_info
    $(".download-table").on('click',function(e){
        var htmls="";
        var uri='data:application/vnd.ms-excel;base64,';
        var template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
        var base64=function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        };
        var format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            })
        };
        htmls = $("#report-info-table").html();
        var ctx = {
            worksheet:'Worksheet',
            table:htmls
        }
        var link=document.createElement("a");
        link.download="export.xls";
        link.href=uri+base64(format(template, ctx));
        link.click();
    });
    //newreport
    $("#t-report-form-type").on('change',function(e){
        e.preventDefault();
        switch($(this).val()){
            case "attendance":
                $("#t-report-form-timefloat").prop("hidden",false);
                $("#t-report-form-timefloat input,#t-report-form-timefloat select").prop("disabled",false);
                $("#t-report-form-timespec").prop("hidden",true);
                $("#t-report-form-timespec select").prop("disabled",true);
                $("#t-report-form-iw").prop("hidden",true);
                $("#t-report-form-events").prop("hidden",true);
                $("#t-report-form-attendance").prop("hidden",false);
                break;
            case "events":
                $("#t-report-form-timefloat").prop("hidden",false);
                $("#t-report-form-timefloat input,#t-report-form-timefloat select").prop("disabled",false);
                $("#t-report-form-timespec").prop("hidden",true);
                $("#t-report-form-timespec select").prop("disabled",true);
                $("#t-report-form-iw").prop("hidden",true);
                $("#t-report-form-attendance").prop("hidden",true);
                $("#t-report-form-events").prop("hidden",false);
                break;
            case "iw":
                $("#t-report-form-timefloat").prop("hidden",false);
                $("#t-report-form-timefloat input,#t-report-form-timefloat select").prop("disabled",false);
                $("#t-report-form-timespec").prop("hidden",true);
                $("#t-report-form-timespec select").prop("disabled",true);
                $("#t-report-form-events").prop("hidden",true);
                $("#t-report-form-attendance").prop("hidden",true);
                $("#t-report-form-iw").prop("hidden",false);
                break;
            case "att-special":
                $("#t-report-form-timefloat").prop("hidden",true);
                $("#t-report-form-timefloat input,#t-report-form-timefloat select").prop("disabled",true);
                $("#t-report-form-timespec").prop("hidden",false);
                $("#t-report-form-timespec select").prop("disabled",false);
                $("#t-report-form-iw").prop("hidden",true);
                $("#t-report-form-events").prop("hidden",true);
                $("#t-report-form-attendance").prop("hidden",true);
                break;
        }
        $("#t-report-form-button").prop("hidden",false);
    });
    $("#t-report-form-button #t-report-form-submit").on('click',async function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),["select",":input[type='number']"])==true){
            if($("#t-report-form-type").val()!=="att-special"){
                let fields=[];
                let null_fields=[true,true];
                let type=$("#t-report-form-type").val();
                await $.each($(`#t-report-form #t-report-form-${type}-check-fields`),function(){
                    if($(this).prop("checked")==true){
                        null_fields[0]=false;
                        fields.push($(this).val());
                    }
                });
                await $.each($(`#t-report-form #t-report-form-${type}-check-res`),function(){
                    if($(this).prop("checked")==true){
                        null_fields[1]=false;
                        fields.push($(this).val());
                    }
                });
                if(null_fields[0]==false&&null_fields[1]==false){
                    $.ajax({
                        type:"POST",
                        url:"/t/newreport",
                        data:{
                            type:type,
                            fields:fields,
                            date:[$("#t-report-form-number-date").val(),$("#t-report-form-date-date").val()]
                        },
                        success: function(id){
                            if(id=="Error"){
                                alert("Ошибка!!!");
                            }
                            else{
                                window.location.href=`/t/mygroup/report/${id}`;
                            }
                        }
                    });
                }
                else{
                    if(null_fields[0]==true){
                        $(`#t-report-form #t-report-form-${type}-check-fields`).addClass("border-danger").animate({left:"-=10"},10).animate({left:"+=10"},10);
                    }
                    if(null_fields[1]==true){
                        $(`#t-report-form #t-report-form-${type}-check-res`).addClass("border-danger").animate({left:"-=10"},10).animate({left:"+=10"},10);
                    }
                }
            }
            else{
                $.ajax({
                    type:"POST",
                    url:"/t/newreport",
                    data:{
                        type:$("#t-report-form-type").val(),
                        date:$("#t-report-form-date-spec-date").val()
                    },
                    success: function(id){
                        if(id=="Error"){
                            alert("Ошибка!!!");
                        }
                        else{
                            window.location.href=`/t/mygroup/report/${id}`;
                        }
                    }
                });
            }
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
    $(".t-my-group-gallery-block img[id^=IMG_]").on('click',function(){
        $("#t-my-group-gallery-show-img").attr("src",$(this).attr("src"));
    });
});