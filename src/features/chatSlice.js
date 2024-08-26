import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevPrompts: [],
  recentPrompt: "",
  resultData: null,
  loading: false,
  input: "",
  showResult: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPrevPrompts: (state, action) => {
      state.prevPrompts = action.payload;
    },
    setShowResult: (state, action) => {
      state.showResult = action.payload;
    },
    setRecentPrompt: (state, action) => {
      state.recentPrompt = action.payload;
    },
    Result: (state, action) => {
      state.resultData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
  },
});
export const {
  setPrevPrompts,
  setRecentPrompt,
  setShowResult,
  Result,
  setLoading,
  setInput,
} = chatSlice.actions;
export default chatSlice.reducer;
