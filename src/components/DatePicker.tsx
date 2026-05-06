import { useState, useRef, useEffect } from "react"
import "../stylesheets/DatePicker.css"
import InputGroup from "./InputGroup"

type DateMode = "full" | "month-day" | "day"

interface DatePickerProps {
    id: string
    name: string
    labelTxt?: string
    value: Date | null
    onChange: (date: Date | null) => void
    mode?: DateMode
}

const MONTHS = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

// Leap year used as fixed anchor for month-day and day modes (no year shown)
const FIXED_YEAR = 2000

const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate()
const firstWeekdayOf = (y: number, m: number) => new Date(y, m, 1).getDay()

const formatDate = (date: Date, mode: DateMode): string => {
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    if (mode === "full") return `${mm}/${dd}/${date.getFullYear()}`
    if (mode === "month-day") return `${mm}/${dd}`
    return dd
}

const maskInput = (raw: string, mode: DateMode): string => {
    if (mode === "full") {
        const digits = raw.replace(/\D/g, "").slice(0, 8)
        if (digits.length <= 2) return digits
        if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
    }
    if (mode === "month-day") {
        const digits = raw.replace(/\D/g, "").slice(0, 4)
        if (digits.length <= 2) return digits
        return `${digits.slice(0, 2)}/${digits.slice(2)}`
    }
    return raw.replace(/\D/g, "").slice(0, 2)
}

const parseInput = (str: string, mode: DateMode): Date | null => {
    if (mode === "full") {
        const match = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
        if (!match) return null
        const m = parseInt(match[1]) - 1, d = parseInt(match[2]), y = parseInt(match[3])
        if (m < 0 || m > 11 || d < 1 || d > daysInMonth(y, m)) return null
        return new Date(y, m, d)
    }
    if (mode === "month-day") {
        const match = str.match(/^(\d{1,2})\/(\d{1,2})$/)
        if (!match) return null
        const m = parseInt(match[1]) - 1, d = parseInt(match[2])
        if (m < 0 || m > 11 || d < 1 || d > daysInMonth(FIXED_YEAR, m)) return null
        return new Date(FIXED_YEAR, m, d)
    }
    const match = str.match(/^(\d{1,2})$/)
    if (!match) return null
    const d = parseInt(match[1])
    if (d < 1 || d > 31) return null
    return new Date(FIXED_YEAR, 0, d)
}

const PLACEHOLDER: Record<DateMode, string> = {
    "full": "mm/dd/yyyy",
    "month-day": "mm/dd",
    "day": "dd"
}

const DatePicker = ({ id, name, labelTxt, value, onChange, mode = "full" }: DatePickerProps) => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [isOpen, setIsOpen] = useState(false)
    const [inputText, setInputText] = useState(value ? formatDate(value, mode) : "")
    const [viewYear, setViewYear] = useState(mode === "full" ? (value ?? today).getFullYear() : FIXED_YEAR)
    const [viewMonth, setViewMonth] = useState((value ?? today).getMonth())
    const [focusedDay, setFocusedDay] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const preEditRef = useRef<Date | null>(value)

    useEffect(() => {
        if (document.activeElement !== inputRef.current) {
            setInputText(value ? formatDate(value, mode) : "")
        }
        if (value) {
            if (mode === "full") setViewYear(value.getFullYear())
            if (mode !== "day") setViewMonth(value.getMonth())
        }
    }, [value, mode])

    const handleFocus = () => { preEditRef.current = value }

    const revert = () => {
        onChange(preEditRef.current)
        setInputText(preEditRef.current ? formatDate(preEditRef.current, mode) : "")
    }

    const open = () => {
        if (value) {
            if (mode === "full") setViewYear(value.getFullYear())
            if (mode !== "day") setViewMonth(value.getMonth())
        }
        setFocusedDay(null)
        setIsOpen(true)
    }

    const close = () => { setIsOpen(false); setFocusedDay(null) }

    const selectDay = (day: number) => {
        const year = mode === "full" ? viewYear : FIXED_YEAR
        const month = mode === "day" ? 0 : viewMonth
        const date = new Date(year, month, day)
        setInputText(formatDate(date, mode))
        onChange(date)
        close()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskInput(e.target.value, mode)
        setInputText(masked)
        if (masked === "") { onChange(null); return }
        const parsed = parseInput(masked, mode)
        if (parsed) {
            onChange(parsed)
            if (mode === "full") setViewYear(parsed.getFullYear())
            if (mode !== "day") setViewMonth(parsed.getMonth())
        }
    }

    const shiftMonth = (delta: number) => {
        if (delta < 0) {
            if (viewMonth === 0) {
                if (mode === "full") setViewYear(y => y - 1)
                setViewMonth(11)
            } else setViewMonth(m => m - 1)
        } else {
            if (viewMonth === 11) {
                if (mode === "full") setViewYear(y => y + 1)
                setViewMonth(0)
            } else setViewMonth(m => m + 1)
        }
        setFocusedDay(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen) {
            if (e.key === "ArrowDown") { open(); e.preventDefault() }
            else if (e.key === "Enter") {
                e.preventDefault()
                const parsed = parseInput(inputText, mode)
                if (parsed) onChange(parsed); else revert()
                inputRef.current?.blur()
            } else if (e.key === "Escape") {
                e.preventDefault()
                revert()
                inputRef.current?.blur()
            }
            return
        }

        if (mode === "day") {
            switch (e.key) {
                case "Escape": revert(); close(); inputRef.current?.blur(); break
                case "ArrowLeft":
                    e.preventDefault()
                    if (focusedDay === null) { setFocusedDay(1); break }
                    if (focusedDay > 1) setFocusedDay(d => d! - 1)
                    break
                case "ArrowRight":
                    e.preventDefault()
                    if (focusedDay === null) { setFocusedDay(1); break }
                    if (focusedDay < 31) setFocusedDay(d => d! + 1)
                    break
                case "ArrowUp":
                    e.preventDefault()
                    if (focusedDay === null) { setFocusedDay(1); break }
                    if (focusedDay > 7) setFocusedDay(d => d! - 7)
                    break
                case "ArrowDown":
                    e.preventDefault()
                    if (focusedDay === null) { setFocusedDay(1); break }
                    if (focusedDay + 7 <= 31) setFocusedDay(d => d! + 7)
                    break
                case "Enter":
                    e.preventDefault()
                    if (focusedDay !== null) selectDay(focusedDay)
                    else { const parsed = parseInput(inputText, mode); if (parsed) onChange(parsed); else revert(); close() }
                    break
            }
            return
        }

        const count = daysInMonth(viewYear, viewMonth)

        switch (e.key) {
            case "Escape": revert(); close(); inputRef.current?.blur(); break
            case "ArrowLeft":
                e.preventDefault()
                if (focusedDay === null) { setFocusedDay(1); break }
                if (focusedDay > 1) { setFocusedDay(d => d! - 1); break }
                const prevM = viewMonth === 0 ? 11 : viewMonth - 1
                const prevY = viewMonth === 0 ? viewYear - 1 : viewYear
                shiftMonth(-1)
                setFocusedDay(daysInMonth(prevY, prevM))
                break
            case "ArrowRight":
                e.preventDefault()
                if (focusedDay === null) { setFocusedDay(1); break }
                if (focusedDay < count) { setFocusedDay(d => d! + 1); break }
                shiftMonth(1)
                setFocusedDay(1)
                break
            case "ArrowUp":
                e.preventDefault()
                if (focusedDay === null) { setFocusedDay(1); break }
                if (focusedDay > 7) setFocusedDay(d => d! - 7)
                break
            case "ArrowDown":
                e.preventDefault()
                if (focusedDay === null) { setFocusedDay(1); break }
                if (focusedDay + 7 <= count) setFocusedDay(d => d! + 7)
                break
            case "Enter":
                e.preventDefault()
                if (focusedDay !== null) selectDay(focusedDay)
                else { const parsed = parseInput(inputText, mode); if (parsed) onChange(parsed); else revert(); close() }
                break
        }
    }

    const first = firstWeekdayOf(viewYear, viewMonth)
    const count = daysInMonth(viewYear, viewMonth)
    const cells: (number | null)[] = [
        ...Array(first).fill(null),
        ...Array.from({ length: count }, (_, i) => i + 1)
    ]
    while (cells.length % 7 !== 0) cells.push(null)

    const isSameDay = (day: number, ref: Date) =>
        ref.getDate() === day &&
        (mode === "day" || ref.getMonth() === viewMonth) &&
        (mode !== "full" || ref.getFullYear() === viewYear)

    return (
        <div className="date-picker">
            <InputGroup type="column" groupContainer="div" gap={0.25}>
                {labelTxt && <label htmlFor={id}>{labelTxt}</label>}
                <input
                    ref={inputRef}
                    type="text"
                    id={id}
                    name={name}
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder={PLACEHOLDER[mode]}
                    className="date-input"
                    onFocus={handleFocus}
                    onClick={open}
                    onBlur={close}
                    onKeyDown={handleKeyDown}
                />
            </InputGroup>

            {isOpen && mode === "day" && (
                <div className="date-calendar" onMouseDown={(e) => e.preventDefault()}>
                    <div className="calendar-header" style={{ justifyContent: "center" }}>
                        <span className="month-year">Day</span>
                    </div>
                    <div className="calendar-grid">
                        {Array.from({ length: 35 }, (_, i) => {
                            const day = i + 1
                            if (day > 31) return <div key={`e-${i}`} className="day-cell empty" />
                            const cls = [
                                "day-cell",
                                value && value.getDate() === day ? "selected" : "",
                                focusedDay === day ? "focused" : ""
                            ].filter(Boolean).join(" ")
                            return (
                                <div key={day} className={cls} onClick={() => selectDay(day)}>
                                    {day}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {isOpen && mode !== "day" && (
                <div className="date-calendar" onMouseDown={(e) => e.preventDefault()}>
                    <div className="calendar-header">
                        <button type="button" className="nav-btn" onClick={() => shiftMonth(-1)}>&#8249;</button>
                        <span className="month-year">
                            {MONTHS[viewMonth]}{mode === "full" ? ` ${viewYear}` : ""}
                        </span>
                        <button type="button" className="nav-btn" onClick={() => shiftMonth(1)}>&#8250;</button>
                    </div>

                    <div className="calendar-grid">
                        {WEEK_DAYS.map(d => <div key={d} className="day-name">{d}</div>)}
                        {cells.map((day, i) => {
                            if (day === null) return <div key={`e-${i}`} className="day-cell empty" />
                            const cls = [
                                "day-cell",
                                mode === "full" && isSameDay(day, today) ? "today" : "",
                                value && isSameDay(day, value) ? "selected" : "",
                                focusedDay === day ? "focused" : ""
                            ].filter(Boolean).join(" ")
                            return (
                                <div key={day} className={cls} onClick={() => selectDay(day)}>
                                    {day}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DatePicker
