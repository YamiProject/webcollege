$(document).ready(function(){
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
        window.location.href="/feed";
    });
});