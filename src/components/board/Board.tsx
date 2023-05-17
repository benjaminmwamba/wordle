import React, { useCallback, useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { alphabet } from "./boardConstants";
import isValidWord from "@/utilities/words";


const Board = () => {
	
	const { boardState, currentSpotState } = useContext(StateContext) as StateContextType;
	const [board, setBoard] = boardState
	const [currentSpot, setCurrentSpot] = currentSpotState
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


	const handleEnter = useCallback(() => {
		
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

	return <BoardUI/>
};

export default Board;
