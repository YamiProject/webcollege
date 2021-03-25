export function escapeHTML(string){
    return string.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\s/g,'');
};
export function filledCheck(element){
    let check=true;
    $(`#${$(element).
        closest("form").attr("id")} :input:text, #${$(this).closest("form").attr("id")} textarea`).each(function(){
        if(escapeHTML($(this).val())==""){
            $(this).addClass("border-warning");
        }
    });
    return check;
}