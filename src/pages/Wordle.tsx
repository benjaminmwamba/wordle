

import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import isValidWord from "@/utilities/words";
import {
	BACKSPACE_KEY_WORD, DELAY_FOR_RESETTING_CASE_COLOR, EMPTY_STRING,
	ENTER_KEY_WORD, FIRST_INDEX, GREEN, LAST_INDEX, LAST_SLOT, LIGHTER_GREY,
	ORANGE, initialCurrentSpot, initialKeyboardKeys, isLetterInAlphabet
} from "@/utilities/constants";
import getNewGuess from "@/utilities/guesses";
import dynamic from 'next/dynamic'

//import Board from "@/components/Board";
const Board = dynamic(() => import("@/components/Board"), { ssr: false })
//import Keyboard from "@/components/Keyboard";
const Keyboard = dynamic(() => import("@/components/Keyboard"), { ssr: false });
import styles from "@/styles/WordleUI.module.scss"
import useScreenSize from "@/hooks/useScreenSize";
import { useRouter } from "next/router";
import { UserWithId } from "./api/createAccount";



const Index: React.FC = () => {

	const { userState, boardState, currentSpotState, attemptState, answerState,
		keyboardKeysState, isGameOverState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState
	const [attempt, setAttempt] = attemptState
	const [answer, setAnswer] = answerState
	const [isAllowedToWrite, setIsAllowedToWrite] = useState<boolean>(true)
	const [keyboardKeys, setKeyboardKeys] = keyboardKeysState
	const [isWordValid, setIsWordValid] = useState<boolean>(false);
	const [isGameOver, setIsGameOver] = isGameOverState
	const [userPrimaryLoginData, changePrimaryUserLoginData] = userState

	const {
		screenWidth,
		screenHeight
	} = useScreenSize()

	const router = useRouter()

	useEffect(() => {
		// Extract user data from the router query parameters
		const userDataString = router.query.userData as string;
		const routedUserData = userDataString ? JSON.parse(userDataString) : null;
		//console.log(routedUserData)
		changePrimaryUserLoginData(routedUserData)
	}, [router.query.userData, changePrimaryUserLoginData]);

	const handleCurrentSpotChange = useCallback(() => {
		setCurrentSpot((previousSpot) => {
			const PREVIOUS_SLOT = previousSpot.id
			const NEW_INDEX = previousSpot.index + 1
			return { id: PREVIOUS_SLOT, index: NEW_INDEX }
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
	const handleLetter = useCallback((letter: string): void => {
		if (currentSpot.id === LAST_SLOT && currentSpot.index === FIRST_INDEX) {

			return
		} else if (currentSpot.index === LAST_INDEX) return
		typeLetterOnBoard(letter)
	}, [currentSpot.id, currentSpot.index, typeLetterOnBoard]);

	const handleWordIsInvalid = useCallback(() => {


		const boardSlots = document.querySelectorAll(`[data-board_slot]`);
		const currentSlot = boardSlots[currentSpot.id - 1];

		const allSelectedCases = currentSlot.querySelectorAll("[data-board_case]")
		allSelectedCases.forEach(boardCase => {
			boardCase.classList.add(styles.shake_animation)
			setTimeout(() => {
				boardCase.classList.remove(styles.shake_animation)
			}, DELAY_FOR_RESETTING_CASE_COLOR);
		})
	}, [currentSpot.id])

	const handleKeyboardKeyColor = useCallback(() => {

		const deepCopyKeyboard: { color: string, text: string }[][] =
			JSON.parse(JSON.stringify(keyboardKeys)); // Create a deep copy of the board

		deepCopyKeyboard.forEach((keys) => {
			keys.forEach((key, slotIndex) => {
				const { text } = key;
				if (attempt.includes(text) === false) return
				if (text === EMPTY_STRING) return

				if (!answer.includes(text)) {
					key.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
				} else if (answer.indexOf(text) === attempt.indexOf(text)) {
					key.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
				} else {
					key.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
				}

			});
		});
		setKeyboardKeys(deepCopyKeyboard)

	}, [answer, attempt, keyboardKeys, setKeyboardKeys])
	const handleWordIsValid = useCallback(() => {
		setIsWordValid(true)

		handleKeyboardKeyColor()
	}, [handleKeyboardKeyColor])


	const handleEnter = useCallback(() => {
		if (currentSpot.index !== LAST_INDEX) return
		//setAttempt(lettersFromTheCurrentSlot)

		if (isValidWord(attempt) === true) {
			handleWordIsValid()
		} else {
			handleWordIsInvalid()
		}
	}, [attempt, currentSpot.index, handleWordIsInvalid, handleWordIsValid]);

	const handleBackspace = useCallback(() => {
		if (currentSpot.index === FIRST_INDEX) return

		const newBoard = [...board]
		if (currentSpot.index === LAST_INDEX) {

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
			const CURRENT_SLOT = previousSpot.id
			const PREVIOUS_INDEX = previousSpot.index - 1
			return { id: CURRENT_SLOT, index: PREVIOUS_INDEX }
		})
	}, [board, currentSpot.id, currentSpot.index, setAttempt, setBoard, setCurrentSpot])



	const handleKeyPress = useCallback((key: string) => {
		if (isAllowedToWrite === false) return
		if (isLetterInAlphabet(key)) {
			handleLetter(key)
		} else if (key === ENTER_KEY_WORD) {
			handleEnter()
		} else if (key === BACKSPACE_KEY_WORD) {
			handleBackspace()
		}
	}, [handleBackspace, handleEnter, handleLetter, isAllowedToWrite])


	useEffect(() => {

		const callaableFunction = (event: KeyboardEvent) => {
			handleKeyPress(event.key)
		}

		window.addEventListener("keyup", callaableFunction)
		return () => window.removeEventListener("keyup", callaableFunction)
	}, [handleKeyPress])

	const getEveryLetterThatMatchesAttemptAndAnswer = useCallback((): string => {
		const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board

		const CURRENT_SPOT_IN_INDEX_NOTATION = currentSpot.id - 1
		const targetRow = deepCopyBoard[CURRENT_SPOT_IN_INDEX_NOTATION];

		const everyLetterThatMatches: string[] = targetRow
			.filter((slot, slotIndex) => slot.text === answer[slotIndex])
			.map((slot) => slot.text);
		return everyLetterThatMatches.join("")
	}, [answer, board, currentSpot.id])

	const isAttemptEqualToAnswer = useCallback(() => {
		return getEveryLetterThatMatchesAttemptAndAnswer() === answer
	}, [answer, getEveryLetterThatMatchesAttemptAndAnswer])

	const handleBoardKeyColor = useCallback(() => {
		const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board)); // Create a deep copy of the board

		deepCopyBoard.forEach((row, rowIndex) => {
			const CURRENT_SPOT_IN_INDEX_NOTATION = currentSpot.id - 1
			if (rowIndex !== CURRENT_SPOT_IN_INDEX_NOTATION) return
			row.forEach((slot, slotIndex) => {
				const { text } = slot;

				if (!answer.includes(text)) {
					slot.color = LIGHTER_GREY; //Change color to LIGHT_GREY if the letter is not in the answer
				} else if (text === answer[slotIndex]) {
					slot.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as attempt
				} else {
					slot.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as attempt
				}
			});
		});

		setBoard(deepCopyBoard); // Update the state with the modified board
		setCurrentSpot(previousSpot => {
			const NEXT_SLOT = previousSpot.id + 1
			return { id: NEXT_SLOT, index: FIRST_INDEX }
		})
		setAttempt(EMPTY_STRING)
		if (isAttemptEqualToAnswer()) {
			setIsAllowedToWrite(false)
			setIsGameOver(true)
		}
	}, [answer, board, currentSpot.id, isAttemptEqualToAnswer, setAttempt, setBoard, setCurrentSpot, setIsGameOver]);

	useEffect(() => {
		if (isWordValid === false) return

		handleBoardKeyColor()
		setIsWordValid(false)
	}, [currentSpot.id, handleBoardKeyColor, isAttemptEqualToAnswer, isWordValid, setIsGameOver])

	useEffect(() => {
		if (currentSpot.id === 7) setIsGameOver(true)
	}, [currentSpot.id, setIsGameOver])

	const startOverOnEnter = useCallback(() => {
		setBoard([
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
			[{ color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }, { color: EMPTY_STRING, text: EMPTY_STRING }],
		]);
		setAttempt(EMPTY_STRING);
		setAnswer(getNewGuess());
		setCurrentSpot(initialCurrentSpot)
		setKeyboardKeys(initialKeyboardKeys)
		setIsGameOver(false)
	}, [setAnswer, setAttempt, setBoard, setCurrentSpot, setIsGameOver, setKeyboardKeys])
	useEffect(() => {
		if (isGameOver === false) {
			setIsAllowedToWrite(true)
		} else {
			setIsAllowedToWrite(false)
			window.addEventListener("keyup", startOverOnEnter)
			return () => window.removeEventListener("keyup", startOverOnEnter)
		}
	}, [isGameOver, startOverOnEnter])



	useEffect(() => {
		const theFunction = (event: any) => {
			const KEY_ATTRIBUTE = "data-keyboard_key"
			const BUTTON_TAG_NAME = "BUTTON";
			const IMAGE_TAG_NAME = "IMG"
			const ENTER = "enter"
			const DELETE_PLACEHOLDER_TEXT = "fd"
			if (!event.target) return;

			const { target } = event;
			const tagName = target.tagName;

			if ((tagName !== BUTTON_TAG_NAME) && (tagName !== IMAGE_TAG_NAME)) return;

			let letter = target.getAttribute(KEY_ATTRIBUTE);
			if (tagName === IMAGE_TAG_NAME) {
				letter = target.parentNode?.getAttribute(KEY_ATTRIBUTE);
			}

			if (letter === ENTER) {
				letter = ENTER_KEY_WORD;
			} else if (letter === DELETE_PLACEHOLDER_TEXT) {
				letter = BACKSPACE_KEY_WORD;
			}

			handleKeyPress(letter);
		}
		document.addEventListener("click", theFunction)
		return () => document.removeEventListener("click", theFunction)
	}, [handleKeyPress])

	const [isParameterOpen, setIsParameterOpen] = useState<boolean>(false)

	const handleMenu = () => {
		setIsParameterOpen(previousIsParametersOpen => !previousIsParametersOpen)
	}

	return (
		<div className={styles.app_container}>
			<nav className={styles.navbar}>
				<h2 className={styles.wordle_title}>wordle</h2>
				<div className={styles.parameter}>
					<button
						onClick={handleMenu}
						className={styles.parameter_gear_container}>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
						<div className={styles.bar}></div>
					</button>
				</div>
			</nav>
			<section className={styles.lower_part}>
				<Board />
				<Keyboard />
			</section>
		</div>
	)
};

export default Index;
