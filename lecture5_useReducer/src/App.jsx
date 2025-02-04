// import { useReducer } from "react";
import { useImmerReducer } from 'use-immer'
import AddTask from "./AddTask.jsx";
import TaskList from "./TaskList.jsx";
import tasksReducer from "./tasksReducer.js";

export default function TaskApp() {
    // useReducer 는 use State과 닮았지만 조금 다른 점이 있다.
    // 첫 번째 인자로 reducer를 받는다는 것.
    // 그리고 setState가 아닌 dispatch를 반환한다는 것
    const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

    // setState로 리액트에게 "무엇을 할 지"를 지시하는 대신
    // action을 전달하여 "사용자 방금 한 일"을 알려준다.
    // 이벤트 핸들러는 사용자의 action을 전달하면서 사용자의 의도에만 집중할 수 있고
    // reducer는 state가 어떤 값으로 업데이트 될지를 결정하기만 하면 된다.
    const handleAddTask = (text) => {
        // dispatch 함수는 action 객체를 인자로 받는다.
        // action을 reducer로 전달하는 역할을 한다.
        dispatch({
            type: "added",
            id: nextId++,
            text: text,
        });
    }

    const handleChangeTask = (task) => {
        dispatch({
            type: "changed",
            task: task,
        });
    }

    const handleDeleteTask = (taskId) => {
        dispatch({
            type: "deleted",
            id: taskId,
        });
    }

    return (
        <>
            <h1>Prague itinerary</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />
        </>
    );
}

let nextId = 3;
const initialTasks = [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false },
];
