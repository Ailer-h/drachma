import { forwardRef, type InputHTMLAttributes } from "react"
import type { InputType } from "../Types"
import InputGroup from "./InputGroup"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {

    type: InputType
    id: string
    name: string

    labelTxt?: string

    groupType?: "div" | "span" | null
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ type, id, name, labelTxt, groupType = "span", ...props }, ref) => {

    const custom_inputs = ["number", "date"]

    let finalInput = <>
        {
            labelTxt &&
            <label htmlFor={id}>{labelTxt}</label>
        }
        <input ref={ref} type={custom_inputs.includes(type) ? "text" : type} id={id} name={name} {...props} />
    </>



    if (custom_inputs.includes(type)) {

        if (type == "date") {

            finalInput = <>
                {
                    labelTxt &&
                    <label htmlFor={id}>{labelTxt}</label>
                }
            </>    

        }

    }else {

         finalInput = <>
            {
                labelTxt &&
                <label htmlFor={id}>{labelTxt}</label>
            }
            <input ref={ref} type={custom_inputs.includes(type) ? "text" : type} id={id} name={name} {...props} />
        </>

    }

    
    if (groupType) {
        return <><InputGroup type="column" groupContainer={groupType} gap={0.25}>
            {finalInput}
        </InputGroup></>

    }

    return finalInput

})

export default InputField