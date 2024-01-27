import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        editTask: (state, action) => {
            const { id, content } = action.payload;
            const taskToEdit = state.find((task) => task.id === id);

            if (taskToEdit) {
                taskToEdit.content = content;
            }
        },
        deleteTask: (state, action) => {
            const idToDelete = action.payload;
            return state.filter((task) => task.id !== idToDelete);
            },
    },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
