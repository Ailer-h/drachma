interface InputGroupProps {

    groupContainer?: "div" | "span"
    children?: React.ReactNode,
    gap?: Number
    type?: "row" | "column"

}

const InputGroup = ({ children, type = "row", groupContainer = "span", gap = 0 }: InputGroupProps) => {

    const style = {
        "display": "flex",
        "flexDirection": type,
        "alignItems": type == "row" ? "center" : "",
        "justifyContent": type == "column" ? "center" : "",
        "gap": gap ? gap + "em" : 0
    }

    if (groupContainer == "span") {
        return <><span style={style}>
            {children}
        </span></>
        
    }else if (groupContainer == "div") {
        return <><div style={style}>
            {children}
        </div></>

    }

}

export default InputGroup