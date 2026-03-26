export function show_password() {

    let field = $(this).parent()
    let other = field.find(".visible")
    let input = field.find("input")
    let input_type = "text"

    if ($(this).hasClass("visible")){
        other = field.find(".invisible")
        input_type = "password"

    }
    
    $(this).css({"display": "none"})
    other.css({"display": "block"})
    input.prop("type", input_type);

}