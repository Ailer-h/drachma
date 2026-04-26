import { useState } from "react"
import Icon, { IconNames } from "./Icon"

import "../stylesheets/IconSelector.css"

interface IconSelectorProps {
    label: string
    
    cols?: number
    rows?: number
}

const IconSelector = ({ label, cols, rows }: IconSelectorProps) => {

    const [ selectedIcon, setSelectedIcon ] = useState("default");

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
                <Icon iconName={selectedIcon}/>
            </div>

            <div className="icon-grid" style={gridTemplate}>
                {
                    IconNames.map((iconName) => [

                        <Icon iconName={iconName} />

                    ])
                }
            </div>

        </div>

    </>

}

export default IconSelector