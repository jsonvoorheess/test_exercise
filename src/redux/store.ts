import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './CurrencySlice/CurrencySlice.ts'
import ticketsReducer from './TicketsSlice/TicketsSlice.ts'

export const store = configureStore({
    reducer: {
        currency:currencyReducer,
        tickets:ticketsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch