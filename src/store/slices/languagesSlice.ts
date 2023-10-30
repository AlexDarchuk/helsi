import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appLanguage = navigator.language.split(/[-_]/)[0];

interface LanguagesState {
  language: string;
}

const initialState: LanguagesState = {
  language: appLanguage,
};

const languagesSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguagesState>) {
      state.language = action.payload.language;
    },
  },
});

export const { setLanguage } = languagesSlice.actions;

export default languagesSlice.reducer;
