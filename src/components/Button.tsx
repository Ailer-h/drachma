import Icon from "./Icon"

interface ButtonProps {

    text?: string
    iconName?: string

    disabled?: boolean

    iconAlign?: "right" | "left"
    
    colorScheme?: "danger" | "default" | "secondary"

    onClick?: React.MouseEventHandler

    btnSize?: "small" | "big"

}

const Button = ({ text, iconName, colorScheme = "default", iconAlign = "right", disabled = false, btnSize = "small", onClick }: ButtonProps) => {

    return <>
        <button className={`systemBtn btn-${btnSize} btn-${colorScheme}`} onClick={onClick} disabled={disabled}>
            {iconAlign == "left" && iconName && <Icon iconName={iconName}/>}
            
            {text}
            
            {iconAlign == "right" && iconName && <Icon iconName={iconName}/>}
        </button>
    </>

}

export default Button