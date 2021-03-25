export function escapeHTML(string){
    return string.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\s/g,'');
};
export function filledCheck(element,check_elements){
    var check=true;
    let selector="";
    check_elements.forEach(val=>{
        selector+=`#${$(element).closest("form").attr("id")} ${val},`;
    });
    $(selector.substring(0,selector.length-1)).each(function(){
        if(escapeHTML($(this).val())==""){
            $(this).addClass("border-warning");
            check=false;
        }
    });
    return check;
}