import { useState } from "react";
import { useTasksDispatch } from "./TasksContext";

function AddTask() {
    const [todo, setTodo] = useState("");
    const dispatch = useTasksDispatch()

    return (
        <div>
            <input
                type="text"
                name="addTask"
                value={todo}
                onChange={(e) => {
                    setTodo(e.target.value);
                }}
            />
            <button onClick={ () => {
                setTodo('')
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: todo,
                })
            }}>Add</button>
        </div>
    );
}

let nextId = 3;

export default AddTask;
