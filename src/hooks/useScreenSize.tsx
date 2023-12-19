import React, { useEffect, useState } from 'react';

const useScreenSize = () => {
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);

	const updateScreenSize = () => {
		setScreenWidth(window.innerWidth);
		setScreenHeight(window.innerHeight);
	};

	useEffect(() => {
		// Add an event listener to update the screen size when the window is resized
		window.addEventListener('resize', updateScreenSize);


		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', updateScreenSize);
		};
	}, []);

	useEffect(() => {
		//console.log(screenWidth)
	}, [screenWidth])
	return {
		screenWidth,
		screenHeight
	}
}

export default useScreenSize;
