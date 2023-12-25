

import type { NextApiRequest, NextApiResponse } from 'next';
import { LoginFormValues } from '../LogIn';
import { UserWithId } from './createAccount';

type Data = any

const lowerCaseDummyUserData: UserWithId = {
	username: "benjamin mwamba",
	emailAddress: "benjaminmwamba75@gmail.com",
	password: "benjamin2004",
	id: "benjaminmwambabenjamin2004"
}


export default function handler(req: NextApiRequest, res: NextApiResponse<UserWithId>) {
	res.status(200)
	res.send(lowerCaseDummyUserData);
}