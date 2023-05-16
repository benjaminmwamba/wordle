import React, { useCallback, useContext, useEffect } from "react";
import styles from "src/styles/Board.module.scss";
import { StateContext, StateContextType } from "@/helpers/StateProvider";
import BoardUI from "./BoardUI";
import { alphabet } from "./boardConstants";


const Board = () => {
	const [board, setBoard,
		attempt, setAttempt,
		currentSpot, setCurrentSpot] = useContext(StateContext) as StateContextType;
	
	const handleCurrentSpot = useCallback(() => {
		setCurrentSpot(previousSpot => {
			return { id: previousSpot.id, index: previousSpot.index + 1 }
		})
	}, [setCurrentSpot])
	const handleLetter = useCallback(() => {
	  
	}, []);
	
	
	const typeLetterOnBoard = useCallback((letter: string) => {
		const newBoard = [...board]
		newBoard[currentSpot.id - 1][currentSpot.index - 1] = letter
		setBoard(newBoard)
		handleCurrentSpot()
	}, [board, currentSpot.id, currentSpot.index, setBoard, handleCurrentSpot])

	const keyDown = useCallback((event: KeyboardEvent) => {
		const key = event.key
		if (alphabet.includes(key)) {
			handleLetter()
		}
	}, [typeLetterOnBoard])

	
	useEffect(() => {
		window.addEventListener("keyup", keyDown)
		return () => window.removeEventListener("keyup", keyDown)
	}, [keyDown])

	return <BoardUI/>
};

export default Board;
