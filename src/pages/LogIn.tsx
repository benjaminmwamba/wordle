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

// ... (imports remain the same)

const lowerCaseUserData: LoginFormValues = {
	username: "benjamin mwamba",
	emailAddress: "benjaminmwamba75@gmail.com",
	password: "benjamin2004",
};

const fetchData = async (formData: LoginFormValues): Promise<any> => {
	try {
		const response = await fetch(LOGIN_ROUTE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		const result: UserWithId = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

const Login: React.FC = () => {
	const router = useRouter();

	const [formData, setFormData] = useState<LoginFormValues>({
		username: '',
		emailAddress: '',
		password: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Pass the dummy login information for now
			const userLoginInformation: UserWithId = await fetchData(lowerCaseUserData);

			// Redirect to Wordle page with login information
			router.push({
				pathname: '/Wordle',
				query: { userData: JSON.stringify(userLoginInformation) },
			});
		} catch (error) {
			console.log(error)
1		}
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
						id="emailAddress"
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
