import React from "react";
import styles from "src/styles/Board.module.scss"
import { changeBoardKeyBackgroundColor } from "./changeBoardKeyBackgroundColor";
import { GREEN, ORANGE, LIGHTER_GREY, REGULAR_BACKGROUND_COLOR } from "@/utilities/colors";

const slotKeys = ["3q35243g", "jgfiaj5w", "83838hg", "giisn8493", "jgfan5589", "ajfng5329"]
const innerKeys = ["abc123", "qwe456", "bnm812", "mcv534", "bjf342"]

const Board = () => {
	return (
		<div className={styles.board_container}>
			<div className={styles.board_slots_container}>
				{
					slotKeys.map((slotKey) => (
						<div data-board_slot key={slotKey} className={styles.board_slot}>
							{
								innerKeys.map(innerKey => <div data-board_case key={innerKey} className={styles.board_case}></div>)
							}
						</div>
					))
				}
			</div>
			
		</div>
	)
};

export default Board;
