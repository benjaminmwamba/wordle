import React, { useEffect, useState } from 'react';
import styles from '@/styles/LogIn.module.scss';
import { useRouter } from 'next/router';
import { UserWithId } from './api/createAccount';


export interface LoginFormValues {
	username: string;
	emailAddress: string;
	password: string;
}

const LOGIN_ROUTE = '/api/logIn';

const lowerCaseUserData: LoginFormValues = {
	username: "benjamin mwamba",
	emailAddress: "benjaminmwamba75@gmail.com",
	password: "benjamin2004",
}

const fetchData = async (): Promise<any> => {
	try {
		const response = await fetch(LOGIN_ROUTE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// You may need to include additional headers (e.g., authentication headers) here
			},
			body: JSON.stringify(lowerCaseUserData),
		});
		const result: UserWithId = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const Login: React.FC = () => {

	const router = useRouter();


	const [formData, setFormData] = useState<LoginFormValues>({
		username: '',
		emailAddress: "",
		password: '',
	});
	

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const loginInformation: UserWithId = await fetchData()

		router.push({
			pathname: '/Wordle',
			query: JSON.stringify(loginInformation),
		});
	};


	return (
		<section className={styles.login_wrapper}>
			<div className={styles.login_container}>
				<h2>Login</h2>
				<form className={styles.login_form} onSubmit={handleSubmit}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
						required
					/>

					<label htmlFor="email">Email Address:</label>
					<input
						type="text"
						id="email address"
						name="emailAddress"
						value={formData.emailAddress}
						onChange={handleInputChange}
						required
					/>

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
					/><br /><br />

					<input type="submit" value="Login" />
				</form>
			</div>
		</section>
	);
};

export default Login;
