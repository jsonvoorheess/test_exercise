export type CurrencyState = "RUB" | "USD" | "EUR"
export type CheckboxName = "all" | "nothing" | "one" | "two" | "three"


export interface Ticket {
    arrival_date: string
    arrival_time: string
    carrier: string
    departure_date: string
    departure_time: string
    destination: string
    destination_name: string
    origin: string
    origin_name: string
    price: number
    stops: number
}

export const CountStops = {
    one: 1,
    two: 2,
    three:3
}