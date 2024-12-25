import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CheckboxName, Ticket} from "../../types.ts";


interface Options {
    all: false,
    nothing: false,
    one: false,
    two: false,
    three: false
}


interface InitialState {
    options: Options,
    value: Ticket[]
}

const initialState:InitialState = {
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
        },
        resetOptions: (state, action:PayloadAction<CheckboxName[]>) => {
            action.payload.forEach((name:CheckboxName) => {
                const chkboxName = state.options
                chkboxName[name] = false
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { resetTickets, changeOptions, resetOptions } = ticketsSlice.actions

export default ticketsSlice.reducer