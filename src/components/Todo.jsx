import { useState } from "react";
import "./Todo.css";

export const Todo = () => {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState({});

  function handleItem(e) {
    let type = e.target.name;
    let data = e.target.value;
    setItem((pre) => {
      return { ...pre, [type]: data, status: false };
    });
  }

  let length = 10;
  var tPage = Math.ceil(length / 3);
  return (
    <div className="mainDiv">
      <h1 className="title">Todo...</h1>
      <div style={{ textAlign: "center" }}>
        <input
          name="type"
          onChange={handleItem}
          type="text"
          placeholder="Type"
          className="inputTitle"
          style={{ width: "100px" }}
        />
        <input
          type="text"
          name="body"
          onChange={handleItem}
          placeholder="Add Task..."
          className="inputBody"
          style={{ width: "300px" }}
        />
        <button
          className="addBtn"
          onClick={() => {
            fetch("http://localhost:3001/todos", {
              method: "POST",
              body: JSON.stringify(item),
              headers: { "content-type": "Application/json" },
            });
            console.log(item);
          }}
        >
          Add
        </button>
      </div>
      <div className="container">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="prev">
          Prev
        </button>
        <button disabled={page === tPage} onClick={() => setPage(page + 1)} className="next">
          Next
        </button>
      </div>
    </div>
  );
};
