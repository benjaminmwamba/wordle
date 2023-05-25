import { useState, useEffect } from 'react';

type UseLocalStorageOptions = {
	defaultValue?: any;
};

const useLocalStorage = <T>(
	key: string,
	options?: UseLocalStorageOptions
): [T | undefined, (value: T) => void] => {
	const { defaultValue } = options || {};

	// Retrieve the value from localStorage or use the defaultValue
	const initialValue: T | undefined = (() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.error(`Error retrieving value from localStorage: ${error}`);
			return defaultValue;
		}
	})();

	const [value, setValue] = useState<T | undefined>(initialValue);

	useEffect(() => {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error(`Error storing value in localStorage: ${error}`);
		}
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
