// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

export interface User {
	username: string,
	emailAddress: string,
	password: string,
}

export interface UserWithId extends User {
	id: string
}

const USERS_JSON_FILE_PATH = 'src/pages/api/users.json';
const getUsers = async (): Promise<UserWithId[]> => {
	try {
		// Read the JSON file asynchronously
		const data = await fs.promises.readFile(USERS_JSON_FILE_PATH, 'utf8');

		// Parse the JSON data into a JavaScript array
		const jsonArray: UserWithId[] = JSON.parse(data);

		return jsonArray;
	} catch (error) {
		console.log(`Error reading or parsing JSON: ${error}`);
		return []
	}
}

const doesUserHaveAccount = async (user: User): Promise<boolean> => {
	try {
		const users = await getUsers();

		const doesUserExistInUsers = users.some((singleUser) =>
			singleUser.username === user.username && singleUser.emailAddress === user.emailAddress
		);

		return doesUserExistInUsers;
	} catch (error) {
		console.error('Error fetching users:', error);
		// Handle the error accordingly, e.g., return false or throw an exception
		return false;
	}
};
const addUserToUsersList = async (newUser: User): Promise<boolean> => {
	try {
		// Get the existing users
		const users = await getUsers();

		const newUserWithId = {
			...newUser,
			id: newUser.username + newUser.password,
		}
		// Add the new user to the array
		users.push(newUserWithId);

		// Write the updated array back to the file
		//fs.writeFile(USERS_JSON_FILE_PATH, JSON.stringify(users, null, 2), 'utf8');
		await fs.writeFile(USERS_JSON_FILE_PATH, JSON.stringify(users, null, 2), (err) => console.log(err));

		console.log('User added successfully');
		return true
	} catch (error) {
		console.error('Error adding user:', error);
		return false
	}
}

type Data = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200);
	try {
		const newUser = req.body;
		const doesUserExist = await doesUserHaveAccount(newUser);
		if (doesUserExist === false) {
			const wasUserAdded = addUserToUsersList(newUser)
			if (await wasUserAdded === true) {
				res.status(200)

				res.send({
					text: "user was created.",
					users: await getUsers()
				})
			} else {
				res.send({text: "user not created"})
			}
		} else {
			res.send({text: "user already exists"})
		}
	} catch (error) {
		res.send({ text: "there was an error" })
	}
}

