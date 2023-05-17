import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { BACKSPACE_KEY_WORD, ENTER_KEY_WORD, alphabet } from "./boardConstants";
import isValidWord from "@/utilities/words";
import { getSelectedBoardCase } from "./changeBoardKeyBackgroundColor";


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
		newBoard[currentSpot.id - 1][currentSpot.index - 1] = letter
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

		const boardSlots = document.querySelectorAll("[data-board_slot]")
		const selectedSlot: any = boardSlots[currentSpot.id - 1];
		const selectedCases = [...selectedSlot.querySelectorAll("[data-board_case]")]

		//const lettersFromTheCurrentSlot = selectedCases.map((singleCase: any) => singleCase.innerText).join("").toLocaleLowerCase()
		//setAttempt(lettersFromTheCurrentSlot)
		if (isValidWord(attempt) === true) {
			handleWordIsValid()
		} else {
			handleWordIsInvalid()
		}

	}, [attempt, currentSpot.id, currentSpot.index, handleWordIsInvalid, handleWordIsValid]);

	const handleBackspace = useCallback(() => {
		if (currentSpot.index === 1) return

		const newBoard = [...board]
		if (currentSpot.index === 6) {

			newBoard[currentSpot.id - 1][currentSpot.index - 2] = "";
			setIsWordValid(false)
		} else {

			newBoard[currentSpot.id - 1][currentSpot.index - 2] = "";
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

	useEffect(() => {
		if (isWordValid === false) return

		if (attempt.split("").every(letter => answer.includes(letter))) {
			console.log("every letter is equal")
		} else if (attempt.split("").some(letter => answer.includes(letter))) {
			console.log("some letters are equal")
		}
		setIsWordValid(false)
	}, [answer, attempt, isWordValid])

	return <BoardUI />
};

export default Board;
