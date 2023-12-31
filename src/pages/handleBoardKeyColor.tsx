
/*
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
*/
const handleBoardKeyColor = useCallback(() => {
	// Create a deep copy of the board
	const deepCopyBoard: { color: string, text: string }[][] = JSON.parse(JSON.stringify(board));

	// Iterate through each row in the board
	deepCopyBoard.forEach((row, rowIndex) => {
		// Check if the current row is the same as the index of the current spot
		const CURRENT_SPOT_IN_INDEX_NOTATION = currentSpot.id - 1;
		if (rowIndex !== CURRENT_SPOT_IN_INDEX_NOTATION) return;

		// Iterate through each slot in the row
		row.forEach((slot, slotIndex) => {
			const { text } = slot;

			// Check if the letter is not in the answer
			if (!answer.includes(text)) {
				slot.color = LIGHTER_GREY; // Change color to LIGHT_GREY if the letter is not in the answer
			} else if (text === answer[slotIndex]) {
				slot.color = GREEN; // Change color to GREEN if the letter is in the answer and at the same index as the attempt
			} else {
				slot.color = ORANGE; // Change color to YELLOW if the letter is in the answer but not at the same index as the attempt
			}
		});
	});

	// Update the state with the modified board
	setBoard(deepCopyBoard);

	// Move to the next spot on the board
	setCurrentSpot(previousSpot => {
		const NEXT_SLOT = previousSpot.id + 1;
		return { id: NEXT_SLOT, index: FIRST_INDEX };
	});

	// Clear the current attempt
	setAttempt(EMPTY_STRING);

	// Check if the attempt is equal to the answer
	if (isAttemptEqualToAnswer()) {
		// If so, disallow further writing and end the game
		setIsAllowedToWrite(false);
		setIsGameOver(true);
	}
}, [answer, board, currentSpot.id, isAttemptEqualToAnswer, setAttempt, setBoard, setCurrentSpot, setIsGameOver]);
