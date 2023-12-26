import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { AiOutlineEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDoneAll } from "react-icons/md";


function useTodo() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditID] = useState(0); // Move 'editId' declaration here
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const addTodo = () => {
    if (input !== "") {
      setTodo([...todo, { list: input, id: Date.now(), status: false }]);
      setInput("");
    }
    if (editId) {
      const editTodo = todo.find((todo) => todo.id === editId);
      const updateTodo = todo.map((to) =>
        to.id === editTodo.id ? { id: to.id, list: input } : to
      );
      setTodo(updateTodo);
      setEditID(0);
      setInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onDelete = (id) => {
    setTodo(todo.filter((td) => td.id !== id));
  };

  const onComplete = (id) => {
    let complete = todo.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodo(complete);
  };

  const onEdit = (id) => {
    const editedTodo = todo.find((to) => to.id === id);
    setInput(editedTodo?.list||'');
    setEditID(editedTodo.id);
  };


  return {
    input,
    setInput,
    todo,
    inputRef,
    addTodo,
    handleSubmit,
    onDelete,
    onComplete,
    onEdit,
    editId,
   
  };
}

function Todo() {
  const {
    input,
    setInput,
    todo,
    inputRef,
    addTodo,
    handleSubmit,
    onDelete,
    onComplete,
    onEdit,
    editId,
   
  } = useTodo();

  return (
    <div className="container App">
      <h2>TODO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          ref={inputRef}
          placeholder="Enter your Todo"
          className="form-control"
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? "Edit" : "Add"}</button>
      </form>
      <div className="list">
        <ul>
          {todo.map((data) => (
            <li className="list-items" key={data.id}>
              <div
                className="list-items-list"
                id={data.status ? "list-item" : ""}
              >
                {data.list}
              </div>
              <span>
                <MdOutlineDoneAll
                  className="list-items-icons"
                  id="complete"
                  onClick={() => onComplete(data.id)}
                />
                <AiOutlineEdit
                  className="list-items-icons"
                  id="edit"
                  onClick={() => onEdit(data.id)}
                />
                <AiFillDelete
                  className="list-items-icons"
                  id="delete"
                  onClick={() => onDelete(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
}

export default Todo;
