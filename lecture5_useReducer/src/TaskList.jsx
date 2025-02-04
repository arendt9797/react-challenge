import { useState } from "react";

function TaskList({ tasks, onChangeTask, onDeleteTask }) {
    const [editId, setEditId] = useState(null);
    const [newText, setNewText] = useState("");

    return (
        <div>
            {tasks.map((task) => (
                <div key={Math.random()}>
                    <input
                        type="checkbox"
                        name="checkTask"
                        checked={task.done}
                        onChange={() => onChangeTask({ ...task, done: !task.done })}
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
                                    onChangeTask({ ...task, text: newText });
                                    setEditId(null); // 수정 완료 후 초기화
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

                    <button onClick={() => onDeleteTask(task.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
