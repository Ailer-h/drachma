import { validate_field } from "./modules/formValidation"
import { show_password } from "./modules/showPasswordInput"
import { supabase, check_session } from "./modules/supabase";

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

    Object.values(inputs).forEach(item => {
        
        total_fields++;

        let result = validate_field(item.field, item.validation_schema)
        
        if (result.result) {
            fields_validated++;
        
        }

    })

    let passwords_match = inputs.password.field.value == inputs.confirm_password.field.value

    if (total_fields == fields_validated && fields_validated > 0 && passwords_match) {

        submit_btn.disabled = false

    }else {
    
        submit_btn.disabled = true

    }

}

document.addEventListener("DOMContentLoaded", () => {

    check_session("dashboard.html", true)

    Object.values(inputs).forEach(item => {
        item.field.addEventListener("input", validate_form)
        item.field.addEventListener("focusout", (e) => {

            let field = $("#" + e.target.id).parent()
            
            if (item.field.value){

                let result = validate_field(item.field, item.validation_schema)
                
                
                if (!result.result){
                    field.find(".input-warning").css({"visibility": "visible"})
                    field.find(".input-warning").html(result.msg)
                    
                    field.removeClass("right").addClass("wrong")
                    
                }else {
                    field.find(".input-warning").css({"visibility": "hidden"})
                    field.find(".input-warning").html(".")
                    
                    field.removeClass("wrong").addClass("right")
                }
            }else {

                    field.removeClass("right")
                    field.removeClass("wrong")
                    field.find(".input-warning").html(".")
                    field.find(".input-warning").css({"visibility": "hidden"})

            }
        })
    })

    document.querySelectorAll(".vicon").forEach(vicon => {
        vicon.addEventListener("click", show_password)
    })

    submit_btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp({
            email: inputs.email.field.value,
            password: inputs.password.field.value,
            options: {
                data: {
                    display_name: inputs.username.field.value,
                }
            }
        })

        if (error) {
            alert(error.message);

        } else {

            Object.values(inputs).forEach(item => {
                item.field.value = "";
            });

            $(".right").each(() => {
                $(this).removeClass(".right")
            })
          
            window.location.href = "dashboard.html";
            
        }

    })
})