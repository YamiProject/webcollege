//Форматирование специальных символов
export function escapeHTML(string){
    try{
        return string.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\s/g,'');
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
            $(this).addClass("border-danger text-danger");
            check=false;
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
    let date=new Date(val);
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
                result+=date.getUTCDate()+1<10?"0"+(date.getUTCDate()+1):date.getUTCDate()+1;
                break;
            case("h"):
                result+= date.getHours()+1<10?"0"+(date.getHours()+1):date.getHours()+1;
                break;
            case("m"):
                result+= date.getMinutes()+1<10?"0"+(date.getMinutes()+1):date.getMinutes()+1;
                break;
            case("s"):
                result+= date.getSeconds()+1<10?"0"+(date.getSeconds()+1):date.getSeconds()+1;
                break;
            default:
                result+=formation[i];
                break;
        }
    }
    return result;
}