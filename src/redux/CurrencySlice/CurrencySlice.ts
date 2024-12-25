import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {CurrencyState} from "../../types.ts";


const initialState:Record<"value", CurrencyState> = {
    value: "RUB"
}

export const currencySlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        changeCurrency: (state, action:PayloadAction<CurrencyState>) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer