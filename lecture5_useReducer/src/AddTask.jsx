import { useState } from "react";

function AddTask({ onAddTask }) {
    const [todo, setTodo] = useState("");

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
            <button onClick={ () => onAddTask(todo) }>Add</button>
        </div>
    );
}

export default AddTask;
