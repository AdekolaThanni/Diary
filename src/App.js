import React, { useReducer } from "react";
import NewDiaryItem from "./components/NewDiaryItem";
import DiaryList from "./components/DiaryList";
import styles from "./App.module.css";

const ACTIONS = {
  addNew: "add-new",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.addNew:
      state = [action.item, ...state];
      localStorage.setItem("diaryList", JSON.stringify(state));
      return state;
    default:
      console.log("NO ACTION");
  }
};

const getStoredItems = () => {
  const storedDiary = JSON.parse(localStorage.getItem("diaryList") || "[]");
  return storedDiary;
};

getStoredItems();

function App() {
  const [state, dispatch] = useReducer(reducer, getStoredItems());

  const addItem = (item) => {
    dispatch({ type: ACTIONS.addNew, item });
  };

  return (
    <div className={styles.diary}>
      <h1>My Diary</h1>
      <NewDiaryItem onAddingItem={addItem} />
      <DiaryList diaryList={state} />
    </div>
  );
}

export default App;
