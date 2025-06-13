import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";

const TodoList = ({ todos }) => {
  // console.log(todos);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState(""); // 수정할 텍스트
  // 완료 상태를 토글하는 함수
  const toggleCompleted = async (todo) => {
    // doc() 특정 문서에 접근하기 위한 "주소"를 만드는 함수
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, {
      completed: !todo.completed, //완료 상태 반전
    });
  };
  // 수정 시작 함수:입력창으로 변경
  const startEding = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  // 수정 저장 함수
  const saveEdit = async (id) => {
    if (editText.trim() === "") return; // 입력이 비어있으며 저장 안됨
    await updateDoc(doc(db, "todos", id), {
      text: editText, //새로운 텍스트로 업데이트
    });
    setEditingId(null); //수정모드 종료
    setEditText(""); //입력창 초기화
  };
  // 삭제 함수
  const deletetodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-2 border-b 
          
          ${todo.completed ? "line-through text-gray-400" : ""} `}>
          {/* 수정 중이면 입력창표시,아니면 텍스트 표시 */}
          {editingId === todo.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border px-2 py-1 w-[280px] mr-2"
              onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)} //enter 키로 저장
            />
          ) : (
            <div>
              <input
                checked={todo.completed} //체크 여부
                onChange={() => toggleCompleted(todo)}
                type="checkbox"
              />
              <span>
                {todo.text}
                {todo.mood}
              </span>
            </div>
          )}
          {/* 수정 / 삭제 버튼 */}
          <div className="flex gap-2">
            {editingId === todo.id ? (
              <button
                onClick={() => saveEdit(todo.id)}
                className="text-green-500 hover:text-green-700">
                저장
              </button>
            ) : (
              <button
                onClick={() => startEding(todo)}
                className="text-blue-500 hover:text-blue-700">
                {" "}
                ✏️
              </button>
            )}
            <button 
            onClick={()=>deletetodo(todo.id)}
            className="text-red-500 hover:text-red-700">🗑️삭제</button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
