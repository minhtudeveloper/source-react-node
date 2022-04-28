import { createSlice } from '@reduxjs/toolkit';


export interface AppOptionsState {

}

const initialState: AppOptionsState = {
  
};

const appOptions = createSlice({
  name: 'appOptions',
  initialState,
  reducers: {
   
  },
});

// Get States


// Actions
export const authActions = appOptions.actions;

// Reducer
const authReducer = appOptions.reducer;
export default authReducer;