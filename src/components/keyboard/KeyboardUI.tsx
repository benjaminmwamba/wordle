import { StateContext, StateContextType } from "@/helpers/StateProvider";
import { EMPTY_STRING } from "@/utilities/constants";
import React, { useContext } from "react";
import styles from "src/styles/Keyboard.module.scss"
import Image from "next/image";
import deleteIcon from "public/deleteIcon.svg"

const keyboardKeys = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	[EMPTY_STRING, "a", "s", "d", "f", "g", "h", "j", "k", "l", EMPTY_STRING],
	["enter", "z", "x", "c", "v", "b", "n", "m", "fd"]
];

const KeyboardUI = () => {
	return (
		<div className={styles.keyboard_container}>
			<div className={styles.touchpad_container}>
				{
					keyboardKeys.map((keySlot, index) => {
						const slotType = () => {
							if (keySlot.includes("q")) return "first"
							if (keySlot.includes(EMPTY_STRING)) return "second"
							if (keySlot.includes("enter")) return "third"
						}

						return (
							<div data-keyboard_slot_type={slotType()} key={(index + "ifdsj3")} className={styles.touchpad_keyslot}>
								{
									keySlot.map((key, index) => {
										return (
											<div data-keyboard_key={key} key={(key + index)} className={styles.touchpad_key}>
												{
													key === "fd" ? <Image style={{
														color: "white",
														fill: "white"
													}} src={deleteIcon} alt="delete icon" /> : key
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
