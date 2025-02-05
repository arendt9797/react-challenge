import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false },
];

// createSlice로 리듀서와 Action Creator 한 번에 관리
const tasksSlice = createSlice({
    name: "tasks",

    initialState: initialTasks,
    reducers: {
        added: (tasks, action) => {
            tasks.push({ id: action.id, text: action.text, done: false });
        },
        changed: (tasks, action) => {
            const idx = tasks.findIndex((task) => task.id === action.task.id);
            tasks[idx] = action.task;
        },
        deleted: (tasks, action) => {
            tasks = tasks.filter((t) => t.id !== action.id);
        },
    },
});

export const { added, changed, deleted } = tasksSlice.actions;
export default tasksSlice.reducer;