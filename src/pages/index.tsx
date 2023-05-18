import React from "react";
import styles from "../styles/WordleUI.module.scss"
import Keyboard from "@/components/keyboard/Keyboard";
import Board from "@/components/board/Board";

const WordleUI = () => {
  return (
    <div className={styles.app_container}>
      <nav className={styles.navbar}>
        <h2 className={styles.wordle_title}>wordle</h2>
      </nav>
      <section className={styles.lower_part}>
        <Board />
        <Keyboard />
      </section>
    </div>
  )
};

export default WordleUI;
