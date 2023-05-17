import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { BACKSPACE_KEY_WORD, ENTER_KEY_WORD, alphabet } from "./boardConstants";
import isValidWord from "@/utilities/words";
import { changeBoardKeyBackgroundColor } from "./changeBoardKeyBackgroundColor";
import { EMPTY_STRING } from "@/utilities/constants";
import { GREEN, LIGHTER_GREY, ORANGE } from "@/utilities/colors";


const Board = () => {

	const { boardState, currentSpotState, attemptState, answerState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState
	const [attempt, setAttempt] = attemptState
	const [answer, setAnswer] = answerState

	const [isWordValid, setIsWordValid] = useState<boolean>(false)

	const handleCurrentSpotChange = useCallback(() => {
		setCurrentSpot((previousSpot) => {
			return { id: previousSpot.id, index: previousSpot.index + 1 }
		})
	}, [setCurrentSpot])

	const handleAttempt = useCallback((letter: string) => {
		const newAttempt = attempt + letter
		setAttempt(newAttempt)
	}, [attempt, setAttempt])

	const typeLetterOnBoard = useCallback((letter: string) => {
		const newBoard = [...board]
		newBoard[currentSpot.id - 1][currentSpot.index - 1].text = letter
		handleAttempt(letter)
		setBoard(newBoard)
		handleCurrentSpotChange()
	}, [board, currentSpot.id, currentSpot.index, handleAttempt, setBoard, handleCurrentSpotChange])
	const handleLetter = useCallback((letter: string) => {
		if (currentSpot.id === 7 && currentSpot.index === 1) {
			console.log("the board is full")
			return
		} else if (currentSpot.index === 6) return
		typeLetterOnBoard(letter)
	}, [currentSpot.id, currentSpot.index, typeLetterOnBoard]);

	const handleWordIsInvalid = useCallback(() => {
		console.log("the word you entered is invalid")
	}, [])
	const handleWordIsValid = useCallback(() => {
		console.log("the word you entered is valid")
		setIsWordValid(true)
	}, [])

	const handleEnter = useCallback(() => {
		if (currentSpot.index !== 6) return

		//setAttempt(lettersFromTheCurrentSlot)
		if (isValidWord(attempt) === true) {
			handleWordIsValid()
		} else {
			handleWordIsInvalid()
		}

	}, [attempt, currentSpot.index, handleWordIsInvalid, handleWordIsValid]);

	const handleBackspace = useCallback(() => {
		if (currentSpot.index === 1) return

		const newBoard = [...board]
		if (currentSpot.index === 6) {

			newBoard[currentSpot.id - 1][currentSpot.index - 2].text = EMPTY_STRING;
			setIsWordValid(false)
		} else {

			newBoard[currentSpot.id - 1][currentSpot.index - 2].text = EMPTY_STRING;
		}
		setAttempt(previousAttempt => {
			const newAttempt = previousAttempt.slice(0, -1);
			return newAttempt
		})
		setBoard(newBoard)
		setCurrentSpot(previousSpot => {
			return { id: previousSpot.id, index: previousSpot.index - 1 }
		})
	}, [board, currentSpot.id, currentSpot.index, setAttempt, setBoard, setCurrentSpot])

	const keyDown = useCallback((event: KeyboardEvent) => {
		const key = event.key
		if (alphabet.includes(key)) {
			handleLetter(key)
		} else if (key === ENTER_KEY_WORD) {
			handleEnter()
		} else if (key === BACKSPACE_KEY_WORD) {
			handleBackspace()
		}
	}, [handleBackspace, handleEnter, handleLetter])


	useEffect(() => {
		window.addEventListener("keyup", keyDown)
		return () => window.removeEventListener("keyup", keyDown)
	}, [keyDown])

	
	
	const handleBoardKeyColor = useCallback(() => {
		const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board

		deepCopyBoard.forEach((row, rowIndex) => {
			if (rowIndex !== currentSpot.id - 1) return
			row.forEach((slot, slotIndex) => {
				const { text } = slot;

				if (!answer.includes(text)) {
					slot.color = LIGHTER_GREY; // Change color to LIGHT_GREY if the letter is not in the answer
				} else if (text === answer[slotIndex]) {
					slot.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
				} else {
					slot.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
				}
			});
		});
		setBoard(deepCopyBoard); // Update the state with the modified board
	}, [answer, board, currentSpot.id, setBoard]);

	useEffect(() => {
		if (isWordValid === false) return

		handleBoardKeyColor()

		setIsWordValid(false)
	}, [handleBoardKeyColor, isWordValid])

	return <BoardUI />
};

export default Board;
