$(document).ready(function(){
    let num;
    setInterval(()=>{
        $('#welcome-page-background').fadeOut(1000,function(){
        num = parseInt($('#welcome-page-background')
        .css("background-image")
        .match(/wp\d/)
        .toString()
        .substr(2));
        if(num+1<5){
            $('#welcome-page-background').css("background-image", `url(/img/other/wp${num+1}.jpg)`).fadeIn(1000);
        }
        else{
            $('#welcome-page-background').css("background-image", `url(/img/other/wp${1}.jpg)`).fadeIn(1000);
        }
    })
    }, 10000);
});