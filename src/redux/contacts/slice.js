import { isAnyOf} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"
import { addContact, deleteContact, fetchContacts } from "./operations";
import { logOutThunk } from "../auth/operations";

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null
  }
}

const slice = createSlice({
  name: "contacts",
  initialState,
  
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.contacts.items = [];
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter((item) => item.id !== action.payload);
      })
      .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), (state) => {
        state.error = null;
        state.loading = true;
      })
      .addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => {
        state.error = action.payload;
      })
  }
});

export const contactsReducer = slice.reducer;