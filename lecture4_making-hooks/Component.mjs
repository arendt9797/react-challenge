import { MyReact, useState, useEffect } from "./React.mjs";

function ExampleComponent() {
    // hook의 순서는 유지되어야 하기 때문에 최상단에서만 hook을 호출할 수 있다.
    const [count, setCount] = useState(0);
    const [text, setText] = useState("foo");

    useEffect(() => {
        console.log("effect", count, text);
        return () => {
            console.log("cleanup", count, text);
        };
    }, [count, text]);

    return {
        click: () => setCount((count) => count + 1),
        type: (text) => setText(text),
        noop: () => setCount(count),
        render: () => console.log("render", { count, text }), // 현재 상태 출력하도록 변경
    };
}

let App = MyReact.render(ExampleComponent); // 초기 렌더링

App.click();
App.click();
App.click();
App = MyReact.render(ExampleComponent); // 리렌더링 되면 클로저가 다시 생성된다. (필요한 정보는 전역 변수로 저장되어 영향은 없다)

App.click();
App.type("bar");
App = MyReact.render(ExampleComponent);

App.noop();
App = MyReact.render(ExampleComponent);