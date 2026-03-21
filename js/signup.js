import { has_minimum_chars, is_valid_email } from "./modules/form_validation.js"

const submit_btn = document.getElementById("submit");

const inputs = {
    username: {
        field: document.getElementById("username"),
        isEmail: false,
        isPassword: false,
        min_length: 5
    },
    email: {
        field: document.getElementById("email"),
        isEmail: true,
        isPassword: false,
        min_length: null
    },
    password: {
        field: document.getElementById("password"),
        isEmail: false,
        isPassword: false,
        min_length: 8
    },
    confirm_password: {
        field: document.getElementById("confirm_password"),
        isEmail: false,
        isPassword: false,
        min_length: 8
    },
}

function validate_form() {
    let is_form_valid = true

    Object.keys(inputs).forEach(key => {
        let input_el = inputs[key]
        
        if (input_el.isEmail) {
            if (!is_valid_email(input_el.field.value)){
                is_form_valid = false
            }
            
        }else {
            if (!has_minimum_chars(input_el.field.value, input_el.min_length)){
                is_form_valid = false
            }

        }
    });

    if (inputs.password.field.value != inputs.confirm_password.field.value){
        is_form_valid = false
    
    }

    submit_btn.disabled = !is_form_valid;

}

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(inputs).forEach(key => {
        inputs[key].field.addEventListener("input", validate_form)
    })
})