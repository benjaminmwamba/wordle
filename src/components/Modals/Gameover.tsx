
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import React, { useContext, useEffect } from "react";
import styles from "src/styles/Modals.module.scss"



const Gameover = () => {

	const {startOver} = useContext(StateContext) as StateContextType

	return (
		<div className={styles.window_container}>
			<div className={styles.modal_container}>
				<div className={styles.header_container}>
					<h2 className={styles.header_text}>do you wanna play again?</h2>
				</div>
				<div className={styles.choice_section}>
					<button onClick={startOver}  className={styles.start_over_btn}>play</button>
				</div>
			</div>
		</div>
	)
};

export default Gameover;
