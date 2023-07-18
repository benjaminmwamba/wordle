import React from "react";
import styles from "@/styles/LandingPage.module.scss"
import Image from "next/image";
import WordleLogo from "public/wordle-icon.svg"

const WORDLE_LOGO_ALT = "Wordle Logo"

const Landing = () => {
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
					<h2>wordle</h2>
				</div>
				<div className={styles.banner}>
					<p>Get 6 chances to guess</p>
					<p>a 5-letter word.</p>
				</div>
				<div className={styles.option_btns}>
					<button className={styles.option_btn}>How to play</button>
					<button className={styles.option_btn}>Log in</button>
					<button className={styles.option_btn} data-play_btn>Play</button>
				</div>
				<div className={styles.info_banner}>
					<p className={styles.date}>July 17, 2023</p>
					<p className={styles.editor_info}>Edited by Benjamin Smith</p>
				</div>
			</div>
		</section>
	)
};

export default Landing;
