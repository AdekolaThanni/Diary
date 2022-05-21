import React, { useState, useReducer } from "react";
import styles from "./NewDiaryItem.module.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "titleInput":
      state = { ...state, title: action.value };
      return state;
    case "contentInput":
      state = { ...state, content: action.value };
      return state;
    case "clearInput":
      state = { title: "", content: "" };
      return state;
    default:
      console.log("How?");
  }
};

function NewDiaryItem(props) {
  const [inputState, dispatch] = useReducer(reducer, {
    title: "",
    content: "",
  });
  const [formVisible, setFormVisible] = useState(false);

  const toggleForm = () => {
    setFormVisible((prevState) => !prevState);
    dispatch({ type: "clearInput" });
  };

  const handleInputs = (event) => {
    switch (event.target.id) {
      case "title":
        dispatch({ type: "titleInput", value: event.target.value });
        break;
      case "content":
        dispatch({ type: "contentInput", value: event.target.value });
        break;
      default:
        console.log("How!!!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const now = new Date();
    if (!inputState.title || !inputState.content) {
      alert("Please fill all fields");
      return;
    }
    const item = {
      id: Math.random(),
      date: `${now.toLocaleString("en-us", {
        month: "long",
      })} ${now.getDate()}, ${now.getFullYear()}`,
      ...inputState,
    };
    props.onAddingItem(item);
    toggleForm();
  };

  return (
    <>
      <button onClick={toggleForm}>{formVisible ? "Clear" : "Write"}</button>
      <form
        className={`${styles["new-diary-form"]} ${
          formVisible ? styles["show-diary-form"] : ""
        }`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={inputState.title}
          id="title"
          onChange={handleInputs}
        />
        <label htmlFor="content">Content</label>
        <textarea
          value={inputState.content}
          name="content"
          id="content"
          onChange={handleInputs}
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default NewDiaryItem;
