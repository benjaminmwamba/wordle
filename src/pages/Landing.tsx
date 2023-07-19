import React from "react";
import styles from "@/styles/LandingPage.module.scss"
import Image from "next/image";
import WordleLogo from "public/wordle-icon.svg"
import { useRouter } from "next/router";
import Link from "next/link";

const WORDLE_LOGO_ALT = "Wordle Logo"

const getCurrentFormattedDate = () => {
	const date = new Date()
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return formattedDate
}

const Landing = () => {
	const router = useRouter()
	const formattedDate = getCurrentFormattedDate()

	return (
		<section className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Image
						src={WordleLogo}
						className={styles.wordle_logo}
						width={10}
						height={10}
						alt={WORDLE_LOGO_ALT}
					/>
					<h2>Wordle</h2>
				</div>
				<div className={styles.banner}>
					<p>Get 6 chances to guess</p>
					<p>a 5-letter word.</p>
				</div>
				<div className={styles.option_btns}>
					<Link href="/Instructions" className={styles.option_btn}>How to play</Link>
					<Link href="/Log-in" className={styles.option_btn}>Log in</Link>
					<Link href="/Wordle" className={styles.option_btn} data-play_btn>Play</Link>
				</div>
				<div className={styles.info_banner}>
					<p className={styles.date}>{formattedDate}</p>
					<p className={styles.editor_info}>Edited by Benjamin Smith</p>
				</div>
			</div>
		</section>
	)
};

export default Landing;
