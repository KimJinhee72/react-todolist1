import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebase";

const TodoForm = ({ user }) => {
  const moodOptions = ["😄", "😐", "😢", "😠", "🥱", "🤩"];
  const [mood, setMood] = useState("😄");
  const [text, setText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      alert("로그인된 사용자가 아닙니다.");
      return;
    }

    if (!text.trim()) {
      alert("할 일을 입력하세요.");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        text, // 할 일 내용
        completed: false,
        created: serverTimestamp(),
        mood,
        uid: user.uid, // 여기서 user.id → user.uid 로 수정
      });
      setText("");
      setMood("😄");
    } catch (error) {
      console.error("할 일 추가 중 오류 발생:", error);
      alert("할 일 추가에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={addTodo}
      className="flex flex-col gap-3 p-4 border rounded-md shadow-md bg-white"
    >
      <input
        className="border px-3 py-2 rounded w-full"
        type="text"
        placeholder="할 일을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <label className="block mb-1 font-semibold">기분상태</label>
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
              onClick={() => setMood(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
