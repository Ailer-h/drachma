import { forwardRef, useState, type InputHTMLAttributes, type ChangeEvent } from "react"
import type { InputType, CurrencyCode } from "../Types"
import InputGroup from "./InputGroup"
import { currencySchemas, formatCurrency } from "../lib/currency"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    type: InputType
    id: string
    name: string
    labelTxt?: string
    groupType?: "div" | "span" | null
    currency?: CurrencyCode
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ type, id, name, labelTxt, groupType = "span", currency = "BRL", onChange, ...props }, ref) => {

    const custom_inputs = ["number", "currency"]
    const schema = currencySchemas[currency]

    const [currencyDisplay, setCurrencyDisplay] = useState(() => formatCurrency("0", schema))

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9,\.]/g, "")
        onChange?.(e)
    }

    const handleCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCurrency(e.target.value, schema)
        setCurrencyDisplay(formatted)
        e.target.value = formatted
        onChange?.(e)
    }

    const resolvedProps =
        type === "number"   ? { inputMode: "decimal" as const, ...props, onChange: handleNumberChange } :
        type === "currency" ? { inputMode: "numeric" as const, ...props, onChange: handleCurrencyChange, value: currencyDisplay } :
                              { ...props, onChange }

    const finalInput = <>
        {labelTxt && <label htmlFor={id}>{labelTxt}</label>}
        <input
            ref={ref}
            type={custom_inputs.includes(type) ? "text" : type}
            id={id}
            name={name}
            {...resolvedProps}
        />
    </>

    if (groupType) {
        return <><InputGroup type="column" groupContainer={groupType} gap={0.25}>
            {finalInput}
        </InputGroup></>
    }

    return finalInput
})

export default InputField