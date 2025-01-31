const App = () => {
  return (
    <>
      <h1>템플릿 없이 리액트 프로젝트 만들기!</h1>
      <h2>{apiUrl}</h2>;
    </>
  );
};

const apiUrl = process.env.APP_API_URL; // 환경 변수 url

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
