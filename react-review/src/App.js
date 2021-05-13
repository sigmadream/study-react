import Todo from './components/Todo';

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo text="리액트 리뷰" />
      <Todo text="Next.js 알아보기" />
      <Todo text="React Native에 대한 정리" />
    </div>
  );
}

export default App;
