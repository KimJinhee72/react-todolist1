import Todolist from "./Todolist.jsx";
import TodoForm from "./TodoForm.jsx";

function App() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">할일목록</h1>
      <TodoForm />
      <Todolist />
    </div>
  );
}

export default App;
