import { useState } from "react";



const TodoItem = ({ todo, index, todos, setTodos }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
  
    const toggleComplete = () => {
      const updated = [...todos];
      updated[index].completed = !updated[index].completed;
      setTodos(updated);
    };
  
    const deleteTodo = () => {
      const updated = todos.filter((_, i) => i !== index);
      setTodos(updated);
    };
  
    const saveEdit = () => {
      const updated = [...todos];
      updated[index].text = editText;
      setTodos(updated);
      setIsEditing(false);
    };
  
    return (
      <div className="flex items-center justify-between bg-white/20 p-2 rounded">
        <div className="flex items-center gap-2 w-full">
          <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
  
          {isEditing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              autoFocus
              className="bg-transparent border-b border-white/50 outline-none w-full"
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className={`cursor-pointer w-full ${todo.completed ? "line-through text-white/50" : ""}`}
            >
              {todo.text}
            </span>
          )}
        </div>
  
        <button
          onClick={deleteTodo}
          className="text-white text-sm hover:text-red-400 px-2"
        >
          ✕
        </button>
      </div>
    );
  };
  
  

const TodoList = ({todos,setTodos, title,height="h-[30vh]"}) => {
 
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
  
    
    setTodos([...todos, { text: trimmed, completed: false }]);
    setInput(""); 
  };

  return (
    <div className="w-[27vw]  flex flex-col">
    <div className="flex items-center gap-4 mb-4 m-2">
  <label className="text-xl text-white whitespace-nowrap font-bold">{title}</label>
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Add a to-do"
    className="flex-1 p-2 rounded bg-white/20 placeholder:text-white/40 text-white"
  />
  <button
    onClick={addTodo}
    className="ml-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 whitespace-nowrap "
  >
    add
  </button>
</div>

<div className={`${height} overflow-y-auto bg-white/10 text-white p-4 rounded-xl space-y-2`}>

      {todos.map((todo, idx) => (
        <TodoItem
          key={idx}
          index={idx}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
    </div>
  );
};
export default TodoList;