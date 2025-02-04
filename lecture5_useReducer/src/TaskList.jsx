import { useState } from "react";
import { useTasks, useTasksDispatch } from "./TasksContext";

function TaskList() {
    const [editId, setEditId] = useState(null);
    const [newText, setNewText] = useState("");

    const tasks = useTasks()
    const dispatch = useTasksDispatch()

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <input
                        type="checkbox"
                        name="checkTask"
                        checked={task.done}
                        onChange={(e) => {
                            dispatch({
                                type: "changed",
                                task: {
                                    ...task,
                                    done: e.target.checked,
                                },
                            });
                        }}
                    />

                    {editId === task.id ? (
                        <>
                            <input
                                type="text"
                                name="changeTask"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                            />
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: "changed",
                                        task: {
                                            ...task,
                                            text: newText,
                                        },
                                    });
                                    setEditId(null)
                                }}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            {task.text}
                            <button
                                onClick={() => {
                                    setEditId(task.id);
                                    setNewText(task.text); // 기존 값으로 초기화
                                }}
                            >
                                Edit
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => {
                            dispatch({
                                type: "deleted",
                                id: task.id,
                            });
                        }}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
