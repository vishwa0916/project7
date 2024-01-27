import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from './NotesSlice'
import taskReducer from './TaskSlice'; // Import your task slice here

export const store = configureStore({


    reducer: {

        NotesPageReducer: NotesReducer,
        tasks: taskReducer

    
    }

})

