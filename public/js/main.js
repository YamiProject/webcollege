$(document).ready(function(){
    class UserClient{

    }
    $("#navbar a").hover(function(){
        $(this).animate({paddingTop:"+=10px"},200);
    },function(){
        $(this).animate({paddingTop:"-=10px"},200);
    });
     /*
    $(".close-button").hover(function(){
        $(this).animate({width:"+=20px",paddingLeft:"+=10px"},200);
    },function(){
        $(this).animate({width:"-=20px",paddingLeft:"-=10px"},200);
    });
   $(".close-button").on('click',function(){
        $("#sidebar").animate({width:"0"},400);
        $(".close-button").animate({left:"-=330px"},400);
        $(".main").animate({left:"0",width:"100.8%"},400)
    });*/
    $()
});