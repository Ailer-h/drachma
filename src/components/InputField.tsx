import { useEffect, useState } from "react";

import validateField from "../functions/FormValidation"

interface fieldProps {
    fieldName: string,
    fieldType: string,
    inputType: string,
    fieldId: string,
    minLength?: number,

    value: string,
    matchValue?: string,

    onChangeValue: (fieldId: string, value: string) => void,
    onValidate?: (fieldId: string, isValid: boolean) => void

}

const InputField = ({fieldName, fieldType, fieldId, inputType, minLength, value, matchValue, onValidate, onChangeValue}: fieldProps) => {

    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>(".");
    const [inputElementType, setinputElementType] = useState<string>(inputType)

    useEffect(() => {
        if (matchValue !== undefined) {
            handleValidation(value, true);
        }
    }, [matchValue]);

    const handleValidation = (value: string, silent: boolean = false) => {

        let validationResult = validateField(
            { value } as HTMLInputElement,
            {
                isEmail: fieldType == "email",
                isPassword: fieldType == "password",
                minLength: minLength ?? 0
            }
        );

        if (matchValue !== undefined && value !== matchValue) {
            validationResult = {
                result: false,
                msg: "Passwords must match"
            };
        }

        if (!silent) {
            setIsValid(validationResult.result);
            setErrorMessage(validationResult.msg);
        }

        onValidate?.(fieldId, validationResult.result);
    };

    const revealPassword = () => {
        if (inputElementType == "password") {
            setinputElementType("text")
        
        }else {
            setinputElementType("password")

        }
    }

    return <>
        <div className={"field" + (isValid == null ? "" : isValid ? " right" : " wrong")}>
            <label htmlFor={fieldId}>{fieldName}</label>
            <input type={inputElementType} name={fieldName} id={fieldId}
             onBlur={(e) => handleValidation(e.target.value)}
             onChange={(e) => { 
                const val = e.target.value;
                onChangeValue(fieldId, val);
                handleValidation(val, true);
            }}/>
            <p className="input-warning">{errorMessage}</p>

            {
                fieldType == "password" &&
                
                <>
                    <svg className="vicon" style={{"display": (inputElementType == "password" ? "none" : "block")}} onClick={revealPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M585-375.24q43-43.23 43-105Q628-542 584.76-585q-43.23-43-105-43Q418-628 375-584.76q-43 43.23-43 105Q332-418 375.24-375q43.23 43 105 43Q542-332 585-375.24Zm-174.5-35.38q-28.5-28.62-28.5-69.5 0-40.88 28.62-69.38 28.62-28.5 69.5-28.5 40.88 0 69.38 28.62 28.5 28.62 28.5 69.5 0 40.88-28.62 69.38-28.62 28.5-69.5 28.5-40.88 0-69.38-28.62ZM234-287Q124-360 68-480q56-120 165.86-193 109.85-73 246-73Q616-746 726-673t166 193q-56 120-165.86 193-109.85 73-246 73Q344-214 234-287Zm246-193Zm211.37 160.92Q788.74-378.16 841-480q-52.26-101.84-149.63-160.92Q594-700 480-700t-211.37 59.08Q171.26-581.84 119-480q52.26 101.84 149.63 160.92Q366-260 480-260t211.37-59.08Z"/></svg>
                    <svg className="vicon" style={{"display": (inputElementType == "password" ? "block" : "none")}} onClick={revealPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m623-441-45-45q3-51-29-73.5T486-579l-45-45q2 0 15.5-2t23.5-2q63 0 105.5 42.5T628-480q0 10-1 21.5t-4 17.5Zm134 134-34-34q36-28 67-62.5t51-76.5q-50-103-147.5-161.5T480-700q-26 0-52.5 3T378-687l-39-39q33-12 70-16t71-4q130 0 245 70.5T892-480q-21 50-55.5 92T757-307Zm15 185L646-250q-27 15-70.5 25.5T480-214q-131 0-246-70.5T68-480q24-58 65.5-106.5T226-670L122-773l33-33 650 651-33 33ZM261-635q-39 26-80 66t-62 89q50 103 147.5 161.5T480-260q37 0 76.5-7t53.5-17l-63-63q-9 7-30 11t-37 4q-63 0-105.5-42.5T332-480q0-15 5-35t10-32l-86-88Zm269 106Zm-73 84Z"/></svg>
                </>

            }


        </div>
    </>
}

export default InputField