import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        value: []
    },
    reducers: {
        add: (state, actions) => {
            let { text, id } = actions.payload
            state.value.push({ text, id, status: false });
        },
        remove: (state, actions) => {
            state.value = state.value.filter(x => x.id != actions.payload)
        },
        status: (state, actions) => {
            let index = state.value.findIndex(x => x.id === actions.payload.id)
            state.value[index].status = actions.payload.status
        }
    }
})

export const { add, remove, status } = todoSlice.actions
export default todoSlice.reducer