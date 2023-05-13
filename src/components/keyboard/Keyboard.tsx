import React, { useState } from "react";
import styles from "src/styles/Keyboard.module.scss"

const keyboardKeys = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
	["enter", "z", "x", "c", "v", "b", "n", "m", "fd"]
];


const Keyboard = () => {
	return (
		<div className={styles.keyboard_container}>
			<div className={styles.touchpad_container}>
				{
					keyboardKeys.map((keySlot, index) => {
						const slotType = () => {
							if (keySlot.includes("q")) return "first"
							if (keySlot.includes("")) return "second"
							if (keySlot.includes("enter")) return "third"
						}
						
						return (
							<div data-keyboard_slot_type={slotType()} key={(index + "ifdsj3")} className={styles.touchpad_keyslot}>
								{
									keySlot.map((key, index) => {
										
										return (
											<div data-keyboard_key={key} key={(key + index)} className={styles.touchpad_key}>
												{key}
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


export default Keyboard;