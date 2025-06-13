const TodoForm = () => {
  const moodOptions = ["😄", "😐", "😢", "😠", "🥱", "🤩"];

  return (
    <form >
      <input className="border px-3 py-2 rounded w-full"
      type="text" placeholder="Add a new task"  id="taskInput"/>
      <div>
        <label>기분상태</label>
        {/* 이모지 영역 */}
        <div>
          {moodOptions.map((mood, index) => (
            <label htmlFor="taskInput" key={index} className="inline-flex items-center mr-2">
              {/* <input
                type="radio"
                name="mood"
                value={mood}
                className="mr-1"
              /> */}
              {mood}
            </label>
          ))}
        </div>
      </div>
      
    </form>
  );
}
export default TodoForm;