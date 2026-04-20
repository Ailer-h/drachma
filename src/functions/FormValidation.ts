interface validationSchema {
    isEmail: boolean,
    isPassword: boolean,
    minLength: number
}

const passwordInvalidMessages: Record <string, string> = {
    uppercase: "Password must contain one uppercase letter.",
    lowercase: "Password must contain one lowercase letter.",
    number: "Password must contain one number.",
    special_char: "Password must contain one special character.",
    min_length: "Password must be at least 10 characters long."
}

const hasMinChars = (inputValue: string, minChars: number) => {
    return inputValue.length >= minChars
}

const isValidEmail = (inputValue: string) => {
    const pattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(inputValue);
}

const checkPassword = (inputValue: string) => {
    const overview: Record <string, boolean> = {
        uppercase: /[A-Z]/.test(inputValue),
        lowercase: /[a-z]/.test(inputValue),
        number: /[0-9]/.test(inputValue),
        special_char: /[^A-Za-z0-9]/.test(inputValue),
        min_length: hasMinChars(inputValue, 10)
    }

    return overview
}

const validateField = (field: HTMLInputElement, validationSchema: validationSchema) => {

    let fieldValue = field.value;
    let fieldName = field.name;

    if (validationSchema.isEmail) {
        if (!isValidEmail(fieldValue)){
            return {
                result: false,
                msg: "Insert Valid Email"
            }
        }
        return  { result: true, msg: "Field validated" }
    }

    if (validationSchema.isPassword) {
        let passwordOverview = checkPassword(fieldValue);
        let result = { result: true, msg: "Field validated" }

        for (const key in passwordOverview){

            if (!passwordOverview[key]) {
                result.result = false,
                result.msg = passwordInvalidMessages[key]

                break;
            }
            
        }

        return result;
    
    }

    if (!hasMinChars(fieldValue, validationSchema.minLength)){
        return {
            result: false,
            msg: fieldName + " must have at least " + validationSchema.minLength + " characters."
        }
    
    }

    return  { result: true, msg: "Field validated" }

}

export default validateField;