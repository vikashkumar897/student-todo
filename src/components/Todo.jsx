import "./Todo.css";

export const Todo = () => {
  return (
    <div className="mainDiv">
      <h1 className="title">Todo...</h1>
      <div style={{ textAlign: "center" }}>
        <input type="text" placeholder="Type" className="inputTitle" style={{ width: "100px" }} />
        <input
          type="text"
          placeholder="Add Task..."
          className="inputBody"
          style={{ width: "300px" }}
        />
        <button className="addBtn">Add</button>
      </div>
      <div className="container">
        <button className="prev">Prev</button>
        <button className="next">Next</button>
      </div>
    </div>
  );
};
