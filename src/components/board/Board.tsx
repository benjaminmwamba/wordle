import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { BACKSPACE_KEY_WORD, ENTER_KEY_WORD, alphabet } from "./boardConstants";
import isValidWord from "@/utilities/words";
import { changeBoardKeyBackgroundColor } from "./changeBoardKeyBackgroundColor";
import { EMPTY_STRING } from "@/utilities/constants";
import { GREEN, LIGHTER_GREY, ORANGE } from "@/utilities/colors";
import styles from "src/styles/Board.module.scss"


const Board = () => {

	const { boardState, currentSpotState, attemptState, answerState, keyboardKeysState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState
	const [attempt, setAttempt] = attemptState
	const [answer] = answerState
	const [isAllowedToWrite, setIsAllowedToWrite] = useState<boolean>(true)
	const [keyboardKeys, setKeyboardKeys] = keyboardKeysState

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
		console.log("try typing another word")
		const boardSlots = document.querySelectorAll(`[data-board_slot]`);
		const currentSlot = boardSlots[currentSpot.id - 1];

		const allSelectedCases = currentSlot.querySelectorAll("[data-board_case]")
		allSelectedCases.forEach(boardCase => {
			boardCase.classList.add(styles.shake_animation)
			setTimeout(() => {
				boardCase.classList.remove(styles.shake_animation)
			}, 1100);
		})
	}, [currentSpot.id])

	const handleKeyboardKeyColor = useCallback(() => {
		console.log(currentSpot.id)
		const deepCopyKeyboard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(keyboardKeys)); // Create a deep copy of the board

		deepCopyKeyboard.forEach((keys) => {
			keys.forEach((key, slotIndex) => {
				const { text } = key;
				if (!attempt.includes(text)) return
				if (text === EMPTY_STRING) return
				
				if (!answer.includes(text)) {
					key.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
				} else if (text === answer[slotIndex]) {
					key.color = ORANGE; // Change color to GREEN if the letter is in the answer and at the same index as attempt
				} else {
					key.color = GREEN; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
				}
			});
		});
		setKeyboardKeys(deepCopyKeyboard)
		console.log(deepCopyKeyboard)
	}, [answer, attempt, currentSpot.id, keyboardKeys, setKeyboardKeys])
	const handleWordIsValid = useCallback(() => {
		console.log("the word you entered is valid")
		setIsWordValid(true)
		handleKeyboardKeyColor()
	}, [handleKeyboardKeyColor])

	
	const handleEnter = useCallback(() => {
		if (currentSpot.index !== 6) return

		//setAttempt(lettersFromTheCurrentSlot)
		console.log("attempt:", attempt)
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

	const keyUp = useCallback((event: KeyboardEvent) => {
		if (isAllowedToWrite === false) return
		const key = event.key
		if (alphabet.includes(key)) {
			handleLetter(key)
		} else if (key === ENTER_KEY_WORD) {
			handleEnter()
		} else if (key === BACKSPACE_KEY_WORD) {
			handleBackspace()
		}
	}, [handleBackspace, handleEnter, handleLetter, isAllowedToWrite])


	useEffect(() => {
		window.addEventListener("keyup", keyUp)
		return () => window.removeEventListener("keyup", keyUp)
	}, [keyUp])



	const handleBoardKeyColor = useCallback(() => {
		const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board
		let everyLetterThatMatches: string[] = []

		deepCopyBoard.forEach((row, rowIndex) => {
			if (rowIndex !== currentSpot.id - 1) return
			row.forEach((slot, slotIndex) => {
				const { text } = slot;

				if (!answer.includes(text)) {
					slot.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
				} else if (text === answer[slotIndex]) {
					slot.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
					everyLetterThatMatches.push(text)
				} else {
					slot.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
				}
			});
		});

		setBoard(deepCopyBoard); // Update the state with the modified board
		setCurrentSpot(previousSpot => {
			return { id: previousSpot.id + 1, index: 1 }
		})
		setAttempt(EMPTY_STRING)
		if (everyLetterThatMatches.join(EMPTY_STRING) === answer) {
			console.log("every letter matches")
			setIsAllowedToWrite(false)
		}
	}, [answer, board, currentSpot.id, setAttempt, setBoard, setCurrentSpot]);

	useEffect(() => {
		if (isWordValid === false) return

		handleBoardKeyColor()

		setIsWordValid(false)
	}, [handleBoardKeyColor, isWordValid])

	return <BoardUI />
};

export default Board;
