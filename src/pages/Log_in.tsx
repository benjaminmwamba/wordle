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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/hello');
				const result = await response.json();
				setData(result);
				console.log(result)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

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
						name="email address"
						value={formData.username}
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
