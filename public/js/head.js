import * as functions from "./functions.js";
$(document).ready(function(){
    if(window.location.href.indexOf("/t/chat")>0){
        $("#msg-block").scrollTop(`${$("#msg-block")[0].scrollHeight}`);
    }
    //Подгрузка
    var load=true;
    $(window).on('scroll',function(e){
        e.preventDefault();
        if(window.location.href.indexOf(/\/h\/group\/\d\/events/)>0){ 
            if($(window).scrollTop()+$(window).height()>$(document).height()-100){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf(/\/h\/group\/\d\/events/)>0){
                        $.ajax({
                            type:"POST",
                            url:"/event_load",
                            data:{
                                count:$("#h-event-article-block>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#h-event-article-block").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf(/\/h\/group\/\d\/individualwork/)>0){
            if($(window).scrollTop()+$(window).height()>$(document).height()-100){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf(/\/h\/group\/\d\/individualwork/)>0){
                        $.ajax({
                            type:"POST",
                            url:"/iw_load",
                            data:{
                                count:$("#h-iw-article-block>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#h-iw-article-block").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf(/\/h\/group\/\d\/attendance/)>0){
            if($(window).scrollTop()+$(window).height()>$(document).height()-100){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf(/\/h\/group\/\d\/attendance/)>0){
                        $.ajax({
                            type:"POST",
                            url:"/attendance_load",
                            data:{
                                count:$("#h-attendance-list>article").length
                            },
                            success: async function(data){
                                if(data!==""){
                                    await $("#h-attendance-list").append(data);
                                    load=true;
                                }
                            }
                        });
                    }
                }
            }
        }
        if(window.location.href.indexOf(/\/h\/group\/\d\/reports/)>0){
            if($(window).scrollTop()+$(window).height()>$(document).height()-100){
                if(load==true){
                    load=false;
                    if(window.location.href.indexOf(/\/h\/group\/\d\/reports/)>0){
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
    const socket=io();
    socket.on('addNewEvent',()=>{
        window.location.reload();
    });
    socket.on('addNewAttendance',()=>{
        window.location.reload();
    });
    socket.on('addNewReport',()=>{
        window.location.reload();
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
    //mainpage
    $("#h-main-fast-form-button").on('click',function(e){
        e.preventDefault();
        if(functions.filledCheck($(this),['select'])==true){
            switch($("#h-main-fast-form-fields").val()){
                case "0":
                    window.location.href=`/h/group/${$("#h-main-fast-form-gr").val()}`;
                    break;
                case "1":
                    window.location.href=`/h/group/${$("#h-main-fast-form-gr").val()}/events`;
                    break;
                case "2":
                    window.location.href=`/h/group/${$("#h-main-fast-form-gr").val()}/attendance`;
                    break;
                case "3":
                    window.location.href=`/h/group/${$("#h-main-fast-form-gr").val()}/reports`;
                    break;
                case "4":
                    window.location.href=`/h/group/${$("#h-main-fast-form-gr").val()}/indiwidualworks`;
                    break;
            }
        }
        
    });
    //group_page
    $(".h-group-menu>div").on('click',function(e){
        e.preventDefault();
        let url=window.location.href.match(/\/h\/group\/\d/i);
        switch($(this).attr("id")){
            case"h-gev-link":
                window.location.href=`${url}/events`;
                break;
            case"h-giw-link":
                window.location.href=`${url}/individualwork`;
                break;
            case"h-gat-link":
                window.location.href=`${url}/attendance`;
                break;
            case"h-gre-link":
                window.location.href=`${url}/reports`;
                break;
        }
    });
    $("#h-group-fast-form-button").on('click',function(e){
        e.preventDefault();
        let url=window.location.href.match(/\/h\/group\/\d/i);
        if(functions.filledCheck($(this),['select'])==true){
            alert(`${url}/student/${$("#h-group-fast-form-student").val()}/${$("#h-group-fast-form-type").val()}`);
            window.location.href=`${url}/student/${$("#h-group-fast-form-student").val()}/${$("#h-group-fast-form-type").val()}`;
        }
    });
    $(".h-group .h-student-block").on('click',function(e){
        e.preventDefault();
        let url=window.location.href.match(/\/h\/group\/\d/);
        window.location.href=`${url}/student/${$(this).attr("id")}`;
    });
    //atendance
    $("#h-attendance-list>div[id^=att-]").on('click',function(){
        let url=window.location.href.match(/\/h\/group\/\d\/attendance/);
        window.location.href=`${url}/${$(this).attr("id").replace("att-",'')}`;
    });
    //attendance_info
    $(".h-abs-student-block").on('click',function(){
        let url=window.location.href.match(/\/h\/group\/\d/);
        window.location.href=`${url}/student/${$(this).attr("id")}/absenteeismes`;
    });
    //events
    $(".h-event-filter-button").on('click',function(e){
        e.preventDefault();
        if($("#h-form-filter-pr").prop("checked")==true){
            $(".h-event-type-pr").prop("hidden",false);
        }
        else{
            $(".h-event-type-pr").prop("hidden",true);
        }
        if($("#h-form-filter-oe").prop("checked")==true){
            $(".h-event-type-oe").prop("hidden",false);
        }
        else{
            $(".h-event-type-oe").prop("hidden",true);
        }
        if($("#h-form-filter-sut").prop("checked")==true){
            $(".h-event-type-sut").prop("hidden",false);
        }
        else{
            $(".h-event-type-sut").prop("hidden",true);
        }
        if($("#h-form-filter-fut").prop("checked")==true){
            $(".h-event-type-fut").prop("hidden",false);
        }
        else{
            $(".h-event-type-fut").prop("hidden",true);
        }
        if($("#h-form-filter-pas").prop("checked")==true){
            $(".h-event-type-pas").prop("hidden",false);
        }
        else{
            $(".h-event-type-pas").prop("hidden",true);
        }
    });
    //reports
    $("#h-reports-list div[id^=rep-]").on('click',function(e){
        e.preventDefault();
        let url=window.location.href.match(/\/h\/group\/\d/);
        window.location.href=`${url}/report/${$(this).attr("id").replace(/\D/gi,'')}`;
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
    //student
    $(".h-student-sections>div[id^=h-st-dot-link]").on('click', function(){
        let url=window.location.href.match(/\/h\/group\/\d\/student\/\d/);
        window.location.href=`${url}/documents`;
    });
    $(".h-student-sections>div[id^=h-st-ach-link]").on('click', function(){
        let url=window.location.href.match(/\/h\/group\/\d\/student\/\d/);
        window.location.href=`${url}/achievements`;
    });
    $(".h-student-sections>div[id^=h-st-ae-link]").on('click', function(){
        let url=window.location.href.match(/\/h\/group\/\d\/student\/\d/);
        window.location.href=`${url}/additionaleducation`;
    });
    $(".h-student-sections>div[id^=h-st-abs-link]").on('click', function(){
        let url=window.location.href.match(/\/h\/group\/\d\/student\/\d/);
        window.location.href=`${url}/absenteeismes`;
    });
    $(".h-student-sections>div[id^=h-st-ind-link]").on('click', function(){
        let url=window.location.href.match(/\/h\/group\/\d\/student\/\d/);
        window.location.href=`${url}/individualwork`;
    });
});