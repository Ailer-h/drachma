import type { InputHTMLAttributes } from "react"
import type { InputType } from "../Types"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {

    type: InputType
    id: string
    name: string
    
    labelTxt?: string
}

const InputField = ({ type, id, name, labelTxt, ...props }: InputFieldProps) => {

    const custom_inputs = ["number"]

    return <>
        {
            labelTxt &&
            <label htmlFor={id}>{labelTxt}</label>
        }
        <input type={custom_inputs.includes(type) ? "text" : type} id={id} name={name} {...props} />
    </>

}

export default InputField