export function has_minimum_chars(input_value, min_chars) {
    return input_value.length >= min_chars
}

export function is_valid_email(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email.value);
}

export function is_valid_password() {
    
}