import React from "react";
import styles from "./DiaryList.module.css";

function DiaryList(props) {
  if (!props.diaryList.length)
    return <h2 className={styles["diary-head"]}>No Loggings Yet!</h2>;

  return (
    <>
      <h2 className={styles["diary-head"]}>Diaries</h2>
      <ul className={styles["diary-list"]}>
        {props.diaryList.map((diary) => {
          return (
            <li key={diary.id}>
              <article>
                <h3>{diary.title}</h3>
                <p>{diary.content}</p>
                <span>{diary.date}</span>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default DiaryList;
