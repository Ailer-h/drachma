import { validate_field } from "./modules/form_validation.js"
import { show_password } from "./modules/show_password_input.js"

const submit_btn = document.getElementById("submit");

const inputs = {
    username: {
        field: document.getElementById("username"),
        validation_schema: {
            isEmail: false,
            isPassword: false,
            min_length: 5
        }
    },
    email: {
        field: document.getElementById("email"),
        validation_schema: {
            isEmail: true,
            isPassword: false,
            min_length: null
        }
    },
    password: {
        field: document.getElementById("password"),
        validation_schema: {
            isEmail: false,
            isPassword: true,
            min_length: 10
        }
    },
    confirm_password: {
        field: document.getElementById("confirm_password"),
        validation_schema: {
            isEmail: false,
            isPassword: true,
            min_length: 10
        }
    },
}

function validate_form() {

    let fields_validated = 0
    let total_fields = 0

    Object.keys(inputs).forEach(key => {

        total_fields++;

        let result = validate_field(inputs[key].field, inputs[key].validation_schema)

        if (result.result) {
            fields_validated++;
        
        }

    });
    
    let passwords_match = inputs.password.field.value == inputs.confirm_password.field.value

    if (total_fields == fields_validated && fields_validated > 0 && passwords_match) {

        submit_btn.disabled = false

    }else {
    
        submit_btn.disabled = true

    }

}

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(inputs).forEach(key => {
        inputs[key].field.addEventListener("input", validate_form)
        inputs[key].field.addEventListener("focusout", (e) => {

            let result = validate_field(inputs[key].field, inputs[key].validation_schema)
            
            let field = $("#" + e.target.id).parent()

            if (!result.result){
                field.find(".input-warning").css({"visibility": "visible"})
                field.find(".input-warning").html(result.msg)

                field.removeClass("right").addClass("wrong")
            
            }else {
                field.find(".input-warning").css({"visibility": "hidden"})

                field.removeClass("wrong").addClass("right")
            }
        })
    })

    document.querySelectorAll(".vicon").forEach(vicon => {
        vicon.addEventListener("click", show_password)
    })
})