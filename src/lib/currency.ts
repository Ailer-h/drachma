import type { CurrencyCode } from "../Types"

export type CurrencySchema = {
    symbol: string
    symbolPosition: "prefix" | "suffix"
    decimalSeparator: string
    thousandsSeparator: string
    decimalPlaces: number
}

export const currencySchemas: Record<CurrencyCode, CurrencySchema> = {
    BRL: { symbol: "R$", symbolPosition: "prefix", decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2 },
    USD: { symbol: "$",  symbolPosition: "prefix", decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 },
    EUR: { symbol: "€",  symbolPosition: "prefix", decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2 },
    GBP: { symbol: "£",  symbolPosition: "prefix", decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 },
    JPY: { symbol: "¥",  symbolPosition: "prefix", decimalSeparator: "",  thousandsSeparator: ",", decimalPlaces: 0 },
    CNY: { symbol: "¥",  symbolPosition: "prefix", decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2 },
}

// Formats raw digit input (cents-based) — used by InputField while typing
export function formatCurrency(rawDigits: string, schema: CurrencySchema): string {
    const digits = rawDigits.replace(/\D/g, "") || "0"
    const cents = parseInt(digits, 10)
    const amount = cents / Math.pow(10, schema.decimalPlaces)
    const [intStr, decStr] = amount.toFixed(schema.decimalPlaces).split(".")
    const intFormatted = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, schema.thousandsSeparator)
    const number = schema.decimalPlaces > 0
        ? `${intFormatted}${schema.decimalSeparator}${decStr}`
        : intFormatted
    return schema.symbolPosition === "prefix"
        ? `${schema.symbol}${number}`
        : `${number}${schema.symbol}`
}

// Formats a real numeric value (e.g. 1500.00 from the DB) — used in display components
export function formatCurrencyValue(value: number, currency: CurrencyCode): string {
    const schema = currencySchemas[currency]
    const [intStr, decStr = ""] = value.toFixed(schema.decimalPlaces).split(".")
    const intFormatted = intStr.replace(/\B(?=(\d{3})+(?!\d))/g, schema.thousandsSeparator)
    const number = schema.decimalPlaces > 0
        ? `${intFormatted}${schema.decimalSeparator}${decStr}`
        : intFormatted
    return schema.symbolPosition === "prefix"
        ? `${schema.symbol}${number}`
        : `${number}${schema.symbol}`
}
