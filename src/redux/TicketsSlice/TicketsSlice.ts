import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CheckboxName, Ticket} from "../../types.ts";

const initialState:Record<"value" | "options", Ticket[] | Record<CheckboxName, boolean>> = {
    options: {
        all: false,
        nothing: false,
        one: false,
        two: false,
        three: false
    },
    value: []
}

export const ticketsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        resetTickets: (state, action:PayloadAction<Ticket[]>) => {
            state.value = action.payload
        },
        changeOptions: (state, action:PayloadAction<[CheckboxName, boolean]>) => {
            const opt = state.options as Record<CheckboxName, boolean>
            opt[action.payload[0]] = action.payload[1]
        }
    },
})

// Action creators are generated for each case reducer function
export const { resetTickets, changeOptions } = ticketsSlice.actions

export default ticketsSlice.reducer