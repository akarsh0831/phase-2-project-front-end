import React,  { useState, useEffect } from "react";
import CreateList from "./Components/CreateList";
import Lists from "./Components/Lists";

function App(props) {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState({
    title: "", 
    author: ""
  });

  useEffect(() => {
    getLists()
  }, []);

  const getLists = () => {
    setLoading( true , () => {
      fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(result =>
            setLoading(false),
            setAllData(result)
        )
        .catch(console.log);
    });
  }

  const handleChange = (event) => {
    var title = singledata.title;
    var author = singleData.author;
    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;
    setSingledata({
        title: title,
        author: author
      });
  }

  const createList = () => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleData)
    }).then(
      setSingleData({
          title: "",
          author: ""
        })
    );
  }

  const getList = (event, id) => {
    setSingleData({
          title: "Loading...",
          author: "Loading..."
        },
      () => {
        fetch("http://localhost:3000/posts/" + id)
          .then(res => res.json())
          .then(result => {
            setSingleData({
                title: result.title,
                author: result.author ? result.author : ""
              })
            });
          });
      }
  }

  const updateList = (event, id) => {
    fetch("http://localhost:3000/posts/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleData)
    })
      .then(res => res.json())
      .then(result => {
        setSingleData({
            title: "",
            author: ""
          });
        getLists();
      });
  }

  const deleteList = (event, id) => {
    fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        setSingleData({
            title: "",
            author: ""
          });
        getLists();
      });
  }

    const listTable = loading ? (
      <span>Loading...Is usually slower than localhost...</span>
    ) : (
      <Lists
        alldata={allData}
        singledata={singleData}
        getList={getList}
        updateList={updateList}
        deleteList={deleteList}
        handleChange={handleChange}
      />
    );
    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={getLists}
          >
            Get Lists
          </button>
          <CreateList
            singledata={singleData}
            createList={createList}
            handleChange={handleChange}
          />
        </span>
        <br />
        {listTable}
      </div>
    );

export default App; 