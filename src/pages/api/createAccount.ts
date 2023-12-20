// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
type Data = {
	name: string
}

export interface User {
	username: string,
	emailAddress: string,
	password: string,
}

export interface UserWithId extends User {
	id: string
}

const filePath = 'path/to/your/file.json';
const createAccount = (user: User): void => {
	// Specify the path to your JSON file

	// Read the JSON file
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return;
		}

		try {
			// Parse the JSON data into a JavaScript object
			const users: UserWithId[] = JSON.parse(data);

			// Now, 'jsonArray' contains the array from the JSON file
			console.log('Array from JSON file:', users);
		} catch (parseError) {
			console.error('Error parsing JSON:', parseError);
		}
	});
}

export default createAccount