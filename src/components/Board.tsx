
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import { EMPTY_STRING, REGULAR_BACKGROUND_COLOR } from "@/utilities/constants";
import React, { useContext } from "react";
import styles from "src/styles/Board.module.scss";
import Gameover from "./Modals/Gameover";



const slotKeys = ["3q35243g", "jgfiaj5w", "83838hg", "giisn8493", "jgfan5589", "ajfng5329"];
const innerKeys = ["abc123", "qwe456", "bnm812", "mcv534", "bjf342"];


const BoardUI = () => {

	const { boardState, isGameOverState } = useContext(StateContext) as StateContextType;
	const [board] = boardState
	const [isGameOver] = isGameOverState


	return (
		<div className={styles.board_container}>
			{isGameOver === true ?
				<Gameover /> :
				null
			}
			<div className={styles.board_slots_container}>
				{board.map((slotKey, index) => {
					const slotKeyKey = slotKeys[index];
					return (
						<div data-board_slot key={slotKeyKey} className={styles.board_slot}>
							{slotKey.map(({ color, text }, index) => {
								const innerKeyKey = innerKeys[index];
								let isFilled = text !== EMPTY_STRING;
								if (color !== EMPTY_STRING) {
									isFilled = false
								}
								return (
									<div key={innerKeyKey} style={{
										backgroundColor: color === EMPTY_STRING ? REGULAR_BACKGROUND_COLOR : color,
									}} data-board_case data-is_filled={isFilled} className={styles.board_case}>
										{text}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	)
};

export default BoardUI;
