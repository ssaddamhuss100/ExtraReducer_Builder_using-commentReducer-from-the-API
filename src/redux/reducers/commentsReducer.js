import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state for the slice
const INITIAL_STATE = { 
  comments: [],   // Store the list of comments
  isLoading: false,  // A flag to track the loading state
  error: null,  // Store error message if any fetch fails
};

// Define an async thunk to fetch the comments from an API
// export const getInitialAsync = createAsyncThunk(
//   "comments/fetchSuccess",  // This is the action type
//   async (req, thunkAPI) => {
//     try {
//     // Making an API request to fetch comments from JSONPlaceholder API
//     const response = await fetch("https://jsonplaceholder.typicode.com/comments");
//     // Check if the response is successful
//     const data = await response.json();  // Parse the JSON data from the response
//     console.log("data are successfully loaded " , data);
//     // Dispatching actions to update the state
//     thunkAPI.dispatch(fetchSuccess(data));  // Dispatch success action with the fetched data
    
//   } catch (error) {
//         // Dispatch error action (this is incorrect, should only dispatch fetchError on failure)
//     thunkAPI.dispatch(fetchError()); // This shouldn't be here in this case, you should only dispatch fetchError on failure
//   }
//   }
// );

export const getInitialAsync = createAsyncThunk('comments/fetchSuccess', //this is action type
  (arg , thunkAPI)=>{
     fetch('https://jsonplaceholder.typicode.com/comments')
     .then((response)=>{
          return response.json()
        })
      .then((data)=>{
          console.log("this is the data from the fetch ",data)
          thunkAPI.dispatch(fetchSuccess(data));
        })
      .catch((err)=>{
            console.log("THis is the error from the Fetch API ", err);
            thunkAPI.dispatch(fetchError());
    });
  }
);

// Create a slice using Redux Toolkit
const commentsSlice = createSlice({
  name: "comments",  // Name of the slice
  initialState: INITIAL_STATE,  // Initial state defined above
  reducers: {
    
    // Reducer to handle when fetch starts
    fetchStart: (state) => {
      state.isLoading = true;  // Set loading to true when the fetch operation starts
    },

    // Reducer to handle successful fetch
    fetchSuccess: (state, action) => {
      state.comments = action.payload;  // Store the fetched comments
      state.isLoading = false;  // Set loading to false as the fetch is completed
    },

    // Reducer to handle fetch error
    fetchError: (state, action) => {
      state.error = "Failed to fetch comments.";  // Set error message
      state.isLoading = false;  // Set loading to false as the fetch operation has failed
    }
  }
});

// Export the reducer for the comments slice
export const commentsReducer = commentsSlice.reducer;

// Export the actions for use in dispatching
export const { fetchStart, fetchSuccess, fetchError } = commentsSlice.actions;

// Selector to access the comments state from the Redux store
export const commentsSelector = (state) => state.commentsReducer;
