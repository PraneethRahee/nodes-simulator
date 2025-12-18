import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  alertState: {
    show: false,
    data: {},
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    showAlert: (state, action) => {
      state.alertState.show = true;
      state.alertState.data = action.payload;
    },
    hideAlert: (state) => {
      state.alertState.show = false;
      state.alertState.data = {};
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  showAlert,
  hideAlert,
} = uiSlice.actions;

export default uiSlice.reducer;