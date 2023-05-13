import { GREEN, ORANGE, LIGHTER_GREY } from './../../utilities/colors';


interface ChangeBoardKeyBackgroundColorProps {
	boardSlotNumber: number,
	boardCaseNumber: number,
	color: "3a3a3c" | "#b59f3b" | "#538d4e" | "#121213"
}

interface GetSelectedBoardCaseProps {
	boardSlotNumber: number,
	boardCaseNumber: number,
}

interface SetBoardCaseBackgroundColor {
	boardCase: HTMLElement,
	color: "3a3a3c" | "#b59f3b" | "#538d4e" | "#121213"
}

export const setBoardCaseBackgroundColor = ({ boardCase, color }: SetBoardCaseBackgroundColor) => {
	boardCase.style.backgroundColor = color
}

export const getSelectedBoardCase = ({ boardSlotNumber, boardCaseNumber }: GetSelectedBoardCaseProps) => {
	const boardSlots = document.querySelectorAll("[data-board_slot]")
	const selectedSlot = boardSlots[boardSlotNumber]
	const allBoardCasesFromCurrentSlot = selectedSlot.querySelectorAll("[data-board_case]")
	const selectedCase = allBoardCasesFromCurrentSlot[boardCaseNumber]
	return selectedCase
}

export const changeBoardKeyBackgroundColor = ({ boardSlotNumber, boardCaseNumber, color }: ChangeBoardKeyBackgroundColorProps) => {
	const selectedCase = getSelectedBoardCase({ boardSlotNumber, boardCaseNumber }) as HTMLElement
	setBoardCaseBackgroundColor({ boardCase: selectedCase, color })
};
