import { useEffect, useState } from "react";
import "./Todo.css";

export const Todo = () => {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState({});
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLength = async function () {
    try {
      let response = await fetch(
        "https://arcane-retreat-44075.herokuapp.com/todos?_page=1&_limit=10000"
      );
      let total = response.headers.get("X-Total-Count");
      setLength(+total);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [length, setLength] = useState(0);

  async function getData() {
    let response = await fetch(
      `https://arcane-retreat-44075.herokuapp.com/todos?_page=${page}&_limit=3`
    );
    let data = await response.json();

    setTodos(data);
    setLoading(false);
  }
  useEffect(() => {
    getLength();
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [page]);

  function handleItem(e) {
    let type = e.target.name;
    let data = e.target.value;
    setItem((pre) => {
      return { ...pre, [type]: data, status: false };
    });
  }

  const consumeTime = () => {
    setTimeout(() => {
      // setPage(Math.floor(item / 3));
      getData();

      setLoading(false);
      // console.log("Time", page);
    }, 100);
  };

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
            setLoading(true);
            fetch("https://arcane-retreat-44075.herokuapp.com/todos", {
              method: "POST",
              body: JSON.stringify(item),
              headers: { "content-type": "Application/json" },
            }).then(() => {
              setLength(length + 1);

              consumeTime();
            });
          }}
        >
          Add
        </button>
      </div>
      <div className="container">
        {length < 1 ? (
          <div className="nothingFound">
            <img
              src="/noitem.png"
              alt=""
              style={{ height: "200px", display: "block", margin: "auto" }}
            />
          </div>
        ) : loading ? (
          <img
            src="https://i.gifer.com/origin/d3/d3f472b06590a25cb4372ff289d81711_w200.gif"
            alt=""
            style={{ height: "100px", display: "block", margin: "auto" }}
          />
        ) : (
          <div className="itemsContainer">
            {todos.map((i) => {
              return (
                <>
                  <h3>{i.type}</h3>
                  <h3>{i.body}</h3>
                  <button
                    className="dltBtn"
                    onClick={() => {
                      setLoading(true);
                      fetch(`https://arcane-retreat-44075.herokuapp.com/todos/${i.id}`, {
                        method: "DELETE",
                      }).then(() => {
                        setLength(length - 1);
                        consumeTime();
                      });
                    }}
                  >
                    Delete
                  </button>
                </>
              );
            })}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="prev">
              &lt;
            </button>
            <span className="pageNumber">{page}</span>
            <button
              disabled={page === Math.ceil(length / 3) || length < 1}
              onClick={() => {
                setPage(page + 1);
              }}
              className="next"
            >
              &gt;
            </button>
          </div>
          <div style={{ marginRight: "20px" }}>Total To Do: {length}</div>
        </div>
      </div>
    </div>
  );
};
