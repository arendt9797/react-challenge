import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import { TasksProvider } from "./TasksContext.jsx";

export default function TaskApp() {
    return (
        <TasksProvider>
            <h1>Prague itinerary</h1>
            <AddTask />
            <TaskList />
        </TasksProvider>
    );
}
