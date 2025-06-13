import Todolist from "./Todolist.jsx";
import TodoForm from "./TodoForm.jsx";
import { useEffect, useState } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase.js";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todos"),orderBy("created", "desc"));// Firestore에서 todos 컬렉션을 가져오고, created 필드를 기준으로 내림차순 정렬합니다.
    const unsubscribe = onSnapshot(q , (snapshot)=>{
      const newTodos = snapshot.docs.map((doc) => ({
        id: doc.id,// 각 문서의 고유ID를 포함
        ...doc.data(),// 문서의 나머지 데이터를 포함(text, completed, created, mood 등)
      }));
      console.log(newTodos);  
      setTodos(newTodos);// 새로운 할 일 목록을 상태에 저장합니다.
    }) ;
    return unsubscribe;// 컴포넌트가 언마운트될 때 Firestore 리스너를 제거합니다.
},[]);// [] 빈배열이면 한번만 실행 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 실행됩니다.
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">할일목록</h1>
      <TodoForm />
      <Todolist todos={todos}/>
    </div>
  );
}

export default App;
