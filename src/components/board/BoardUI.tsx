import { StateContext, StateContextType } from "@/helpers/StateProvider";
import React, { useContext } from "react";
import styles from "src/styles/Board.module.scss";



const slotKeys = ["3q35243g", "jgfiaj5w", "83838hg", "giisn8493", "jgfan5589", "ajfng5329"];
const innerKeys = ["abc123", "qwe456", "bnm812", "mcv534", "bjf342"];


const BoardUI = () => {

	const [board, setBoard] = useContext(StateContext) as StateContextType;

	return (
		<div className={styles.board_container}>
			<div className={styles.board_slots_container}>
				{board.map((slotKey, index) => {
					const slotKeyKey = slotKeys[index];
					return (
						<div data-board_slot key={slotKeyKey} className={styles.board_slot}>
							{slotKey.map((innerKey, index) => {
								const innerKeyKey = innerKeys[index];
								return (
									<div data-board_case key={innerKeyKey} className={styles.board_case}>
										{innerKey}
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
