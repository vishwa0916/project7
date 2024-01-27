
import { createSlice } from '@reduxjs/toolkit';


const notesSlice = createSlice({

    name: 'notes',
    initialState: [],



    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        },

        editNote: (state, action) => {
            const { id, Econtent1, Econtent2 } = action.payload;
            const noteToEdit = state.map((note) => {


                if (note.id === id) {
                    return {
                        ...note,
                        content1: Econtent1,
                        content2: Econtent2
                    }
                }
                else
                    return note;

            });

            return noteToEdit;
        },

        deleteNote: (state, action) => {
            const idToDelete = action.payload;



            return state.filter((note) => note.id !== idToDelete);
        },
    },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
