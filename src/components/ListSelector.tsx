import { useState, useEffect, useRef, type ChangeEventHandler } from "react"
import "../stylesheets/ListSelector.css"
import InputField from "./InputField"

interface ListSelectorProps {

    options: Array<string>

    id: string
    name: string

    filterList?: boolean

    labelTxt?: string

    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>

    onSelect?: (value: string) => void

}

const ListSelector = ({ options, labelTxt, id, name, value, filterList=true, onChange, onSelect }: ListSelectorProps) => {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ highlightedIndex, setHighlightedIndex ] = useState(-1)
    const [ selected, setSelected ] = useState("")
    const optionsRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSelect = (item: string) => {
        setSelected(item)
        onSelect?.(item)
    }

    const resetToSelected = () => {
        if (!selected) return
        const nativeInput = inputRef.current
        if (!nativeInput) return
        const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
        nativeSetter?.call(nativeInput, selected)
        nativeInput.dispatchEvent(new Event("input", { bubbles: true }))
    }

    const filtered = value && filterList
        ? options.filter(o => o.toLowerCase().includes(value.toLowerCase()))
        : options

    useEffect(() => {
        if (!value) setSelected("")
    }, [value])

    useEffect(() => {
        if (highlightedIndex >= 0 && optionsRef.current) {
            const items = optionsRef.current.querySelectorAll(".option")
            items[highlightedIndex]?.scrollIntoView({ block: "nearest" })
        }
    }, [highlightedIndex])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) {
            if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
                setIsOpen(true)
                setHighlightedIndex(0)
                e.preventDefault()
            }
            return
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setHighlightedIndex(i => Math.min(i + 1, filtered.length - 1))
                break
            case "ArrowUp":
                e.preventDefault()
                setHighlightedIndex(i => Math.max(i - 1, 0))
                break
            case "Enter":
                e.preventDefault()
                if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                    handleSelect(filtered[highlightedIndex])
                    setIsOpen(false)
                    setHighlightedIndex(-1)
                }
                break
            case "Escape":
                resetToSelected()
                setIsOpen(false)
                setHighlightedIndex(-1)
                break
        }
    }

    return <>
        <div className="list-selector">

            <InputField ref={inputRef} type="text" id={id} name={name} labelTxt={labelTxt}
                        groupType="div"
                        className="list-search"
                        value={value}
                        onChange={(e) => { setIsOpen(true); setHighlightedIndex(-1); onChange?.(e); }}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => {
                            const match = options.find(o => o.toLowerCase() === value?.toLowerCase())
                            if (match) {
                                handleSelect(match)
                            } else {
                                resetToSelected()
                            }
                            setIsOpen(false)
                            setHighlightedIndex(-1)
                        }}
                        onKeyDown={handleKeyDown}/>

            { isOpen && <div className="list-options" ref={optionsRef}>

                {
                    filtered.length == 0 ? (
                        <div className="option">No option</div>
                    ) : (
                        filtered.map((option, index) => (
                            <div key={option}
                                 className={`option${selected === option ? " selected" : ""}${highlightedIndex === index ? " highlighted" : ""}`}
                                 onMouseDown={(e) => e.preventDefault()}
                                 onClick={() => { handleSelect(option); setIsOpen(false); setHighlightedIndex(-1); }}>
                                {option}
                            </div>
                        ))
                    )
                }

            </div> }
        </div>
    </>

}

export default ListSelector
