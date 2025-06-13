import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";

const TodoForm = () => {
  const moodOptions = ["😄", "😐", "😢", "😠", "🥱", "🤩"];
  const addTodo = async (e) => {
    e.preventDefault();
    if(!text.trim()) {
      alert("할 일을 입력해주세요.");
      return;// 입력값이 없을 때 경고창 표시  // 입력값이 없으면 함수 종료(리턴의 의미)
    }
    // addDoc 함수는 Firebase Firestore에 새로운 문서를 추가하는 함수입니다.
    await addDoc(
      collection(db, "todos"),
      {
        text,// 할 일 내용
        completed: false, // 완료 여부
        created: serverTimestamp(), // 서버에서 생성된 타임스탬프
        mood, // 기분 상태 사용자가 선택한 이모지 상태
      }
    )
    setText(""); // 입력 필드 초기화
    setMood("😄"); // 기분 상태 초기화
  };
  const [mood, setMood] = useState("😄");
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={addTodo}
      className="flex flex-col gap-3 p-4 border rounded-md shadow-md bg-white">
      <input
        className="border px-3 py-2 rounded w-full"
        type="text"
        placeholder="할 일을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <label className="block mb-1 font-semibold">기분상태</label>
        {/* 이모지 영역 */}
        <div className="flex gap-2 flex-wrap">
          {moodOptions.map((emoji) => (
            <button
              type="button"
              key={emoji}
              className={`text-xl px-2 py-1 rounded ${
                mood === emoji
                  ? "border-2 border-blue-500 bg-blue-100"
                  : "border"
              }`}
              onClick={() => setMood(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        추가
      </button>
    </form>
  );
};
export default TodoForm;
