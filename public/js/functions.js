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
export function filledCheck(element,fields){
    var check=true;
    let selector="";
    fields.forEach(val=>{
        selector+=`#${$(element).closest("form").attr("id")} ${val},`;
    });
    $(selector.substring(0,selector.length-1)).each(function(){
        if(escapeHTML($(this).val())==""){
            $(this).addClass("border-danger");
            check=false;
        }
    });
    return check;
}
export function clear(element){
    $(`#${$(element).closest("form").attr("id")} input, #${$(element).closest("form").attr("id")} textarea`).each(function(){
        $(this).val("");
    });
}