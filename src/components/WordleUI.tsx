import React from "react";
import Board from "./board/Board";
import Keyboard from "./keyboard/Keyboard";
import styles from "../styles/WordleUI.module.scss"

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