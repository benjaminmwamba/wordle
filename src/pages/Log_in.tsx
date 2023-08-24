import React, { useState } from 'react';
import styles from '@/styles/Log_in.module.scss';

interface LoginFormValues {
	username: string;
	password: string;
	accountType: string;
}

const Login: React.FC = () => {
	const [formData, setFormData] = useState<LoginFormValues>({
		username: '',
		password: '',
		accountType: 'apple',
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

					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
					/><br /><br />

					<label htmlFor="accountType">Account Type:</label>
					<select
						id="accountType"
						name="accountType"
						value={formData.accountType}
						onChange={handleInputChange}
						required
					>
						<option value="apple">Apple</option>
						<option value="google">Google</option>
						<option value="unique">Unique Account</option>
					</select><br /><br />

					<input type="submit" value="Login" />
				</form>
			</div>
		</section>
	);
};

export default Login;
