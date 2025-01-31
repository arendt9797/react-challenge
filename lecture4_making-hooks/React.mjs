let hooks = []; // 상태들을 저장하는 배열
let currentHook = 0; // 상태 배열을 순회할 때 필요한 인덱스

// 손수만든 useState
const useState = (initialValue) => {
    // hooks와 currentHook을 이용하여 배열을 순회한다.
    // useState()가 실행될 때마다 인덱스가 증가하는 형태이기에 useState()의 순서가 유지되는 것이 중요하다!
    hooks[currentHook] = hooks[currentHook] || initialValue; // 상태가 이미 있으면 그대로, 없으면 초기값
    const hookIndex = currentHook; // 현재 인덱스의 스냅샷 저장! 앞으로 원하는 상태에 접근하기 위해 필요하다.
    const setState = (newState) => {
        // 외부 변수 hookIndex를 참조하는 클로저 생성
        // 각 클로저가 hookIndex를 기억하기 때문에 setState가 갱신해야하는 state에만 접근할 수 있다!
        if (typeof newState === "function") {
            // setState에 함수를 전달한 경우
            hooks[hookIndex] = newState(hooks[hookIndex]);
        } else {
            hooks[hookIndex] = newState; // setState에 일반 값을 전달한 경우
        }
    };
    return [hooks[currentHook++], setState]; // [현재 상태, 클로저]를 반환
    // 상태 배열의 현재 인덱스는 채웠으니, 다음 인덱스에 새로운 상태를 저장하기 위해 ++를 붙인다.
};

// 손수만든 useEffect
const useEffect = (callback, depArray) => {
    const hasNoDeps = !depArray; // 의존성 배열이 없을 경우 hasNoDeps는 true

    // useEffect 함수 내에서 현재 인덱스에 값이 있다는 뜻은 deps속성과 cleanUp 메서드를 가진 객체가 담겨있다는 뜻!
    // deps 속성에는 이전 의존성 배열이 들어있고, cleanUp 메서드는 이전 clean up 함수다.
    // 현재 인덱스에 값이 있다면 prevDeps에 이전 의존성 배열을 할당하고, 없다면 undefined
    const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined;
    // 현재 인덱스에 값이 있다면 prevCleanUp에 이전 clean up 함수를 할당하고, 없다면 undefined
    const prevCleanUp = hooks[currentHook]
        ? hooks[currentHook].cleanUp
        : undefined;
    // 이전 의존성 배열과 현재 의존성 배열을 비교하여 변화된 상태가 있는지 확인
    const hasChangedDeps = prevDeps
        ? !depArray.every((el, i) => el === prevDeps[i]) // 하나라도 다를 경우 true, 다 같다면 false
        : true; // 이전 의존성 배열이 없다면 true

    // 의존성 배열이 없거나, 변경된 상태가 감지될 경우
    if (hasNoDeps || hasChangedDeps) {
        if (prevCleanUp) prevCleanUp(); // 저장했던 clean up 함수가 있다면 해당 함수를 실행시킨다.
        const cleanUp = callback();     // 콜백함수를 실행한 결과인 현재 clean up 함수를 cleanUp 변수에 할당한다.
        hooks[currentHook] = { deps: depArray, cleanUp };   // 상태 배열의 현재 인덱스에, 현재 의존성 배열과 현재 clean up 함수를 속성과 메서드로 가지는 객체를 담는다.
    }
    currentHook++;  // 다음 인덱스로 넘어가기
};

// render 메서드를 가진 객체 MyReact
const MyReact = {
    render(Component) {
        // 컴포넌트를 인자로 받는다.
        const Comp = Component(); // 컴포넌트를 실행하여 이펙트들을 처리하고 반환값을 Comp에 저장
        Comp.render(); // 컴포넌트의 렌더링 메서드 실행
        currentHook = 0; // 렌더링이 끝나면 인덱스 초기화
        return Comp; // 컴포넌트(jsx는 아니지만 결국 객체를 다룬다는 점은 같으니 컴포넌트라 생각하자) 반환
    },
};

export { MyReact, useState, useEffect };
