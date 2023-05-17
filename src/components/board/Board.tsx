import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { alphabet } from "./boardConstants";
import isValidWord from "@/utilities/words";
import { getSelectedBoardCase } from "./changeBoardKeyBackgroundColor";


const Board = () => {

	const { boardState, currentSpotState, attemptState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState
	const [attempt, setAttempt] = attemptState

	const [isSlotFinished, setIsSlotFinished] = useState<boolean>(false)

	const handleSlotFinished = () => {

	}

	const handleCurrentSpotChange = useCallback(() => {
		setCurrentSpot((previousSpot) => {
			return { id: previousSpot.id, index: previousSpot.index + 1 }
		})
	}, [setCurrentSpot])

	const typeLetterOnBoard = useCallback((letter: string) => {
		const newBoard = [...board]
		newBoard[currentSpot.id - 1][currentSpot.index - 1] = letter
		setBoard(newBoard)
		handleCurrentSpotChange()
	}, [board, currentSpot.id, currentSpot.index, setBoard, handleCurrentSpotChange])
	const handleLetter = useCallback((letter: string) => {
		if (currentSpot.id === 7 && currentSpot.index === 1) {
			console.log("the board is full")
			return
		} else if (currentSpot.index === 6) return
		typeLetterOnBoard(letter)
	}, [currentSpot.id, currentSpot.index, typeLetterOnBoard]);

	const handleWordIsInvalid = () => {
		console.log("the word you entered is invalid")
	}

	const handleEnter = useCallback(() => {
		if (currentSpot.index !== 6) return

		const boardSlots = document.querySelectorAll("[data-board_slot]")
		const selectedSlot: any = boardSlots[currentSpot.id - 1];
		const selectedCases = [...selectedSlot.querySelectorAll("[data-board_case]")]

		const lettersFromTheCurrentSlot = selectedCases.map((singleCase: any) => singleCase.innerText).join("")

		if (isValidWord(lettersFromTheCurrentSlot) === false) {
			handleWordIsInvalid()
			return
		}

	}, [currentSpot.id, currentSpot.index]);

	const handleBackspace = useCallback(() => {
		if (currentSpot.index === 1) return
		
		const newBoard = [...board]
		if (currentSpot.index === 6) {

			newBoard[currentSpot.id - 1][currentSpot.index - 2] = "";
		} else {
			
			newBoard[currentSpot.id - 1][currentSpot.index - 2] = "";
		}
		setBoard(newBoard)
		setCurrentSpot(previousSpot => {
			return { id: previousSpot.id, index: previousSpot.index - 1 }
		})
	}, [board, currentSpot.id, currentSpot.index, setBoard, setCurrentSpot])

	const keyDown = useCallback((event: KeyboardEvent) => {
		const key = event.key
		if (alphabet.includes(key)) {
			handleLetter(key)
		} else if (key === "Enter") {
			handleEnter()
		} else if (key === "Backspace") {
			handleBackspace()
		}
	}, [handleBackspace, handleEnter, handleLetter])


	useEffect(() => {
		window.addEventListener("keyup", keyDown)
		return () => window.removeEventListener("keyup", keyDown)
	}, [keyDown])

	return <BoardUI />
};

export default Board;
