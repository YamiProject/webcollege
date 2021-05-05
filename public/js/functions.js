//Форматирование специальных символов
export function escapeHTML(string){
    try{
        return string.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .trim();
    }
    catch{
        return "";
    }
};
//Проверка на аполнение полей
export function filledCheck(element,fields){
    var check=true;
    let selector="";
    fields.forEach(val=>{
        selector+=`#${$(element).closest("form").attr("id")} ${val},`;
    });
    $(selector.substring(0,selector.length-1)).each(function(){
        if(escapeHTML($(this).val())==""||escapeHTML($(this).val())==null||escapeHTML($(this).val())=='null'){
            if($(this).prop("disabled")==false){
                $(this).addClass("border-danger text-danger");
                check=false;
            }
        }
    });
    return check;
}
//Отчистка полей
export function clear(element){
    $(`#${$(element).closest("form").attr("id")} input, #${$(element).closest("form").attr("id")} textarea`).each(function(){
        $(this).val("");
    });
}
//Форматирование даты на уровне приложения 
export function dateNormalise(val,format){
    let date;
    val!=="now"?date=new Date(val):date=new Date(); 
    let formation=format.split('');
    let result="";
    for(let i=0;i<formation.length;i++){
        switch(formation[i]){
            case("Y"):
                result+= date.getFullYear();
                break;
            case("M"):
                result+=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
                break;
            case("D"):
                result+=date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate();
                break;
            case("h"):
                result+= date.getHours()<10?"0"+date.getHours():date.getHours();
                break;
            case("m"):
                result+= date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                break;
            case("s"):
                result+= date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
                break;
            default:
                result+=formation[i];
                break;
        }
    }
    return result;
}