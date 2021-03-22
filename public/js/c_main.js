$(document).ready(function(){   
    function escapeHTML(string){
        return string.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
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
        if($("#anouncement-form-head").val().trim()!=="" &&
           $("#anouncement-form-type").val().trim()!=="" &&
           $("#anouncement-form-text").val().trim()!==""){
            $.ajax({
                type:"POST",
                url:"/announcements",
                data:{
                    head:$("#anouncement-form-head").val(),
                    type:$("#anouncement-form-type").val(),
                    file:$("#anouncement-form-file").val(),
                    text:$("#anouncement-form-text").val()
                },
                success: function(res){
                    $(".announcement-block").prepend(`<article class="col-xl-8 col-11 row justify-content-center">
                                                            <div class="col-xl-11 col-12 row justify-content-center">
                                                                <div class="col-12">
                                                                    <div class="col-12 announcement-header">
                                                                        <h2 class="col-12 text-center display-4">${$("#anouncement-form-head").val()}</h2>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-10 col-4 row announcement-info">
                                                                    <div class="col-xl-4 col-12">
                                                                        <label class="col-12 text-center">${$.now()}</label>
                                                                    </div>
                                                                    <div class="col-xl-8 col-12">
                                                                        <label class="col-12 text-center">${$("#anouncement-form-type").val()}</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xl-12 col-8 announcement-text">
                                                                        <p class="col">${$("#anouncement-form-text").val()}</p>
                                                                </div>
                                                            </div>  
                                                        </article>`);
                },
                error: function(err){

                }
            });
        }
        else{
            if($("#anouncement-form-head").val().trim()==""){
                $("#anouncement-form-head").addClass("border-warning");
            }
            if($("#anouncement-form-type").val().trim()==""){
                $("#anouncement-form-type").addClass("border-warning");
            }
            if($("#anouncement-form-text").val().trim()==""){
                $("#anouncement-form-text").addClass("border-warning");
            }
        }
    });
    //Обнуление состояния ошибки
    $("#anouncement-form-head, #anouncement-form-type, #anouncement-form-text").on('click', function(){
        $(this).removeClass("border-warning");
    });
});