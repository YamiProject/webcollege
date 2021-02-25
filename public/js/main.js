$(document).ready(function(){
    class UserClient{

    }
    $("#navbar a").hover(function(){
        $(this).animate({paddingBottom:"+=20px"},200);
    },function(){
        $(this).animate({paddingBottom:"-=20px"},200);
    });
});