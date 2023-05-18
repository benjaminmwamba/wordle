import { StateContext, StateContextType } from "@/helpers/StateProvider";
import { EMPTY_STRING } from "@/utilities/constants";
import React, { useContext } from "react";
import styles from "src/styles/Keyboard.module.scss"
import Image from "next/image";
import deleteIcon from "public/deleteIcon.svg"
import { BRIGHT_GREY } from "@/utilities/colors";

const keyboardKeys = [
	[{ color: EMPTY_STRING, text: "q" },
	{ color: EMPTY_STRING, text: "w" },
	{ color: EMPTY_STRING, text: "e" },
	{ color: EMPTY_STRING, text: "r" },
	{ color: EMPTY_STRING, text: "t" },
	{ color: EMPTY_STRING, text: "y" },
	{ color: EMPTY_STRING, text: "u" },
	{ color: EMPTY_STRING, text: "i" },
	{ color: EMPTY_STRING, text: "o" },
	{ color: EMPTY_STRING, text: "p" }
	],
	[
		{ color: EMPTY_STRING, text: EMPTY_STRING },
		{ color: EMPTY_STRING, text: "a" },
		{ color: EMPTY_STRING, text: "s" },
		{ color: EMPTY_STRING, text: "d" },
		{ color: EMPTY_STRING, text: "f" },
		{ color: EMPTY_STRING, text: "g" },
		{ color: EMPTY_STRING, text: "h" },
		{ color: EMPTY_STRING, text: "j" },
		{ color: EMPTY_STRING, text: "k" },
		{ color: EMPTY_STRING, text: "l" },
		{ color: EMPTY_STRING, text: EMPTY_STRING }
	],
	[
		{ color: EMPTY_STRING, text: "enter" },
		{ color: EMPTY_STRING, text: "z" },
		{ color: EMPTY_STRING, text: "x" },
		{ color: EMPTY_STRING, text: "c" },
		{ color: EMPTY_STRING, text: "v" },
		{ color: EMPTY_STRING, text: "b" },
		{ color: EMPTY_STRING, text: "n" },
		{ color: EMPTY_STRING, text: "m" },
		{ color: EMPTY_STRING, text: "fd" }
	]
];


const KeyboardUI = () => {
	return (
		<div className={styles.keyboard_container}>
			<div className={styles.touchpad_container}>
				{
					keyboardKeys.map((keySlot, index) => {

						return (
							<div data-keyboard_slot_type key={(index + "ifdsj3")} className={styles.touchpad_keyslot}>
								{
									keySlot.map(({ color, text }, index) => {
										return (
											<div style={{
												backgroundColor: color === EMPTY_STRING ? BRIGHT_GREY : color
											}} data-keyboard_key={text} key={(text + index)} className={styles.touchpad_key}>
												{
													text === "fd" ? <Image style={{
														color: "white",
														fill: "white"
													}} src={deleteIcon} alt="delete icon" /> : text
												}
											</div>
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
