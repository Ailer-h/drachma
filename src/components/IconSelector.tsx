import Icon, { FinalcialIcons } from "./Icon"

import "../stylesheets/IconSelector.css"

interface IconSelectorProps {
    label: string
    
    cols?: number
    rows?: number
    
    value: string
    onChange: (iconName: string) => void
}

const IconSelector = ({ label, cols, rows, value, onChange }: IconSelectorProps) => {

    const gridTemplate = {
        "gridTemplateColumns": cols ? `repeat(${cols}, 1fr)` : "repeat(5, 1fr)", 
        "gridTemplateRows": rows ? `repeat(${rows}, 1fr)` : "1fr", 
    }

    return <>
        <div className="icon-selector">

            <div className="title">
                <h3>{label}</h3>
            </div>

            <div className="selected-icon">
                <Icon iconName={value}/>
            </div>

            <div className="icon-grid custom-scrollbar" style={gridTemplate}>
                    {
                        FinalcialIcons.map((iconName) => (

                            <Icon 
                                className={value === iconName ? "selected" : ""}
                                iconName={iconName}
                                key={iconName}
                                onClick={() => onChange(iconName)}
                            />

                        ))
                    }
            </div>

        </div>

    </>

}

export default IconSelector