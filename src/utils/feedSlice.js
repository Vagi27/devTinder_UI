import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => null,
        removeFeedCard: (state, action) => {
            return state.filter((card) => card._id !== action.payload);
        },
    },
});

export const { addFeed, removeFeed, removeFeedCard } = feedSlice.actions;
export default feedSlice.reducer;
