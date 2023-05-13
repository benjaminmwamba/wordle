import { getSelectedBoardCase } from "./changeBoardKeyBackgroundColor"


export interface ChangeBoardKeyInnerTextProps {
	boardSlotNumber: number,
	boardCaseNumber: number
	text: string
}


export const changeBoardKeyInnerText = ({boardSlotNumber, boardCaseNumber, text}: ChangeBoardKeyInnerTextProps) => {
	const selectedBoardCase = getSelectedBoardCase({ boardSlotNumber, boardCaseNumber })
	selectedBoardCase.innerText = text
}