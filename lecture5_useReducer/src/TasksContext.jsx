import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

// 현재 tasks 리스트를 제공
export const TasksContext = createContext(null);
// 컴포넌트에서 action을 dispatch하는 함수 제공
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

    // useReducer에서 반환된 상태와 dispatch를 아래 트리 전체에 제공(Provide)할 수 있다.
    // 이제 props를 전달하지 않아도 된다.
    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useTasks() {
    return useContext(TasksContext);
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case "added": {
            // return [
            //     ...tasks,
            //     {
            //         id: action.id,
            //         text: action.text,
            //         done: false,
            //     },
            // ];
            tasks.push({ id: action.id, text: action.text, done: false });
            break;
        }
        case "changed": {
            // return tasks.map((t) => {
            //     if (t.id === action.task.id) {
            //         return action.task;
            //     } else {
            //         return t;
            //     }
            // });
            const idx = tasks.findIndex((task) => task.id === action.task.id);
            tasks[idx] = action.task;
            break;
        }
        case "deleted": {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
};

const initialTasks = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false },
];
