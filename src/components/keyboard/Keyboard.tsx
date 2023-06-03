
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import { BRIGHT_GREY, EMPTY_STRING, REGULAR_BACKGROUND_COLOR } from "@/utilities/constants";
import React, { useContext } from "react";
import styles from "src/styles/Keyboard.module.scss"
import Image from "next/image";
import deleteIcon from "public/deleteIcon.svg"


const KeyboardUI = () => {
	const { keyboardKeysState } = useContext(StateContext) as StateContextType
	const [keyboardKeys] = keyboardKeysState

	return (
		<div className={styles.keyboard_container}>
			<div className={styles.touchpad_container}>
				{
					keyboardKeys.map((keySlot, index) => {

						return (
							<div data-keyboard_slot_type key={(index + "ifdsj3")} className={styles.touchpad_keyslot}>
								{
									keySlot.map(({ color, text }, index) => {
										const getBackgroundColor = () => {
											if (color === EMPTY_STRING && text === EMPTY_STRING) {
												return REGULAR_BACKGROUND_COLOR
											} else if (color === EMPTY_STRING && text !== EMPTY_STRING) {
												return BRIGHT_GREY
											} else {
												return color
											}
										}
										return (
											<button style={{
												backgroundColor: getBackgroundColor()
											}} data-keyboard_key={text} key={(text + index)} className={styles.touchpad_key}>
												{
													text === "fd" ? <Image style={{
														color: "white",
														fill: "white"
													}} src={deleteIcon} alt="delete icon" /> : text
												}
											</button>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		</div>
	)
};

export default KeyboardUI;
