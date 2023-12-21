import React, { useEffect, useState } from 'react';
import styles from '@/styles/Log_in.module.scss';

interface LoginFormValues {
	username: string;
	emailAddress: string;
	password: string;
}

const Login: React.FC = () => {
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Perform login logic here using the form data
		console.log(formData);
	};

	const [data, setData] = useState<any>(null)

	const CREATE_ACCOUNT_ROUTE = '/api/createAccount';

	

	useEffect(() => {
		const BENJAMIN_DUMMY_FORM_DATA = {
			username: 'Benjamin Mwamba',
			emailAddress: "benjaminmwamba75@gmail.com",
			password: 'Benjamin2004',
		}
		const fetchData = async () => {
			try {
				const lowerCaseUserData = {
					username: BENJAMIN_DUMMY_FORM_DATA.username.toLowerCase(),
					emailAddress: BENJAMIN_DUMMY_FORM_DATA.emailAddress.toLowerCase(),
					password: BENJAMIN_DUMMY_FORM_DATA.password.toLowerCase(),
				}
				const response = await fetch(CREATE_ACCOUNT_ROUTE, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// You may need to include additional headers (e.g., authentication headers) here
					},
					body: JSON.stringify(lowerCaseUserData),
				});
				const result = await response.json();
				setData(result);
				console.log(result.text)
				console.table(result.users)
			} catch (error) {
				console.error('Error fetching data:', error);
			}

			
		};
		//if ((formData.username !== "") && (formData.emailAddress !== "") && (formData.password.length > 7))
		fetchData();
	}, []);

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
