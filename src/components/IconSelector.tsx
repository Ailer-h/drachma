import Icon, { FinalcialIcons } from "./Icon"

import "../stylesheets/IconSelector.css"

interface IconSelectorProps {
    label: string

    type: "fullsize" | "popup"
    
    cols?: number
    rows?: number
    
    value: string
    onChange: (iconName: string) => void
}

const IconSelector = ({ label, type, cols = 5, rows = 1, value, onChange }: IconSelectorProps) => {

    const gridTemplate = {
        "gridTemplateColumns": `repeat(${cols}, 1fr)`,
        "gridTemplateRows": `repeat(${rows}, 1fr)`
    }

    return <>
        <div className={"icon-selector  " + type}>

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