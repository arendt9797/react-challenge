/**
 * reducer 함수는 state에 대한 로직을 다루는 순수 함수
 * 리액트는 reducer에서 반환한 값을 state에 설정한다.
 *
 * @param tasks 현재의 state 값
 * @param action action 객체
 * @returns 다음 state 값 반환
 */

// immer 라이브러리를 사용하면 상태를 직접 바꾸는 코드를 작성해도 불변성을 유지하도록 도와준다
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
            const idx = tasks.findIndex(task => task.id === action.task.id)
            tasks[idx] = action.task
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

export default tasksReducer;
