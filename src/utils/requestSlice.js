import { createSlice } from "@reduxjs/toolkit";
import reducer from "./userSlice";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            return state.filter((r) => {
                return r._id !== action.payload;
            });
        },
        removeAllRequest: (state, action) => null,
    },
});

export const { addRequest, removeRequest,removeAllRequest } = requestSlice.actions;
export default requestSlice.reducer;
