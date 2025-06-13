import Todolist from "./Todolist.jsx";
import TodoForm from "./TodoForm.jsx";
import { useEffect, useState } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";
import Auth from "./Auth.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null); // 사용자 상태를 관리합니다.
  // useState 훅을 사용하여 todos 상태를 초기화합니다. 이 상태는 할 일 목록을 저장합니다.
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("created", "desc")); // Firestore에서 todos 컬렉션을 가져오고, created 필드를 기준으로 내림차순 정렬합니다.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => ({
        id: doc.id, // 각 문서의 고유ID를 포함
        ...doc.data(), // 문서의 나머지 데이터를 포함(text, completed, created, mood 등)
      }));
      console.log(newTodos);
      setTodos(newTodos); // 새로운 할 일 목록을 상태에 저장합니다.
    });
    return unsubscribe; // 컴포넌트가 언마운트될 때 Firestore 리스너를 제거합니다.
  }, []); // [] 빈배열이면 한번만 실행 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 실행됩니다.
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">✔할일목록</h1>
      {/* Auth 컴포넌트는 인증 관련 기능을 처리합니다. */}
      <Auth setUser={setUser} />
      {user ? (
        <>
          <TodoForm user={user} />
          <Todolist todos={todos} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">
          로그인 후 할 일을 관리할 수 있습니다.
        </p>
      )}
    </div>
  );
}

export default App;
