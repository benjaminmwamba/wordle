import { StateContext, StateContextType } from "@/helpers/StateProvider";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { alphabet } from "../board/boardConstants";
import KeyboardUI from "./KeyboardUI";




const Keyboard = () => {
	const { boardState, currentSpotState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState

	const handleCurrentSpotChange = useCallback(() => {
		setCurrentSpot(previousSpot => {
			let newSpot;



			newSpot = { id: previousSpot.id, index: previousSpot.index + 1 }
			return newSpot
		})
	}, [setCurrentSpot])

	const typeLetterOnBoard = useCallback((letter: string) => {
		const newBoard = [...board]
		newBoard[currentSpot.id - 1][currentSpot.index - 1] = letter
		setBoard(newBoard)
		handleCurrentSpotChange()
	}, [board, currentSpot.id, currentSpot.index, setBoard, handleCurrentSpotChange])
	const handleLetter = useCallback((letter: string) => {
		typeLetterOnBoard(letter)
	}, [typeLetterOnBoard]);


	const handleEnter = useCallback(() => {
		console.log("Enter")
	}, []);

	const handleBackspace = () => {
		console.log("Backspace")
	}

	const keyDown = useCallback((event: KeyboardEvent) => {
		const key = event.key
		if (alphabet.includes(key)) {
			handleLetter(key)
		} else if (key === "Enter") {
			handleEnter()
		} else if (key === "BackSpace") {
			handleBackspace()
		}
	}, [handleEnter, handleLetter])


	useEffect(() => {
		window.addEventListener("keyup", keyDown)
		return () => window.removeEventListener("keyup", keyDown)
	}, [keyDown])
	return <KeyboardUI />
};


export default Keyboard;