import { GREEN, ORANGE, LIGHTER_GREY } from './../../utilities/colors';


export interface ChangeKeyboardKeyBackgroundColorProps {
	touchpadSlotNumber: number,
	touchpadKeyNumber: number,
	color: "3a3a3c" | "#b59f3b" | "#538d4e" | "#121213"
}

interface GetSelectedKeyboardKeyProps {
	touchpadSlotNumber: number,
	touchpadKeyNumber: number,
}

interface SetKeyboardCaseBackgroundColorProps {
	touchpadKey: HTMLElement,
	color: "3a3a3c" | "#b59f3b" | "#538d4e" | "#121213"
}

export const setKeyboardCaseBackgroundColor = ({ touchpadKey, color }: SetKeyboardCaseBackgroundColorProps) => {
	touchpadKey.style.backgroundColor = color
}

export const getSelectedKeyboardKey = ({ touchpadSlotNumber, touchpadKeyNumber }: GetSelectedKeyboardKeyProps) => {
	const keyboardSlots = document.querySelectorAll("[data-keyboard_slot_type]")
	const selectedSlot = keyboardSlots[touchpadSlotNumber]
	const allKeyboardKeysFromCurrentSlot = selectedSlot.querySelectorAll("[data-keyboard_key]")
	const selectedKey = allKeyboardKeysFromCurrentSlot[touchpadKeyNumber]
	return selectedKey as HTMLElement
}

export const changeKeyboardKeyBackgroundColor = ({ touchpadSlotNumber, touchpadKeyNumber, color }: ChangeKeyboardKeyBackgroundColorProps) => {
	const selectedKey = getSelectedKeyboardKey({ touchpadSlotNumber, touchpadKeyNumber })
	setKeyboardCaseBackgroundColor({ touchpadKey: selectedKey, color })
	console.log(selectedKey)
};
