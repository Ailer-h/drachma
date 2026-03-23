const password_checking_messages = {
    uppercase: "Password must contain one uppercase letter.",
    lowercase: "Password must contain one lowercase letter.",
    number: "Password must contain one number.",
    special_char: "Password must contain one special character.",
    min_length: "Password must be at least 10 characters long."
}

function has_minimum_chars(input_value, min_chars) {
    return input_value.length >= min_chars
}

function is_valid_email(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function check_password(password) {
    return {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special_char: /[^A-Za-z0-9]/.test(password),
      min_length: has_minimum_chars(password, 10)
    };
}

export function validate_field(field, validation_schema) {

    let field_value = field.value
    let field_name = field.name

    if (validation_schema.isEmail) {
        if (!is_valid_email(field_value)){
            return {
                result: false,
                msg: "Insert valid email"
            }
        
        }

    }else if (validation_schema.isPassword){
        console.log("Password")
        let password_state = check_password(field_value)
        let result = {
            result: false,
            msg: null
        }

        Object.keys(password_state).forEach(key => {
            if (!result["msg"] && !password_state[key]) {
                result["msg"] = password_checking_messages[key]
            }
        });

        if (result["msg"]) {
            return result
        }
    
    }else {

        if (!has_minimum_chars(field_value, validation_schema.min_length)) {
            return {
                result: false,
                msg: field_name + " must have at least " + validation_schema.min_length + " characters."
            }
        }

    }

    return {
        result: true,
        msg: "Field validated"
    }

}