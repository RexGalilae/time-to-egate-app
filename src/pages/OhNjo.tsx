import React, { useEffect, useRef } from 'react';
import { FloatingBackButton } from '../components/Header/Header';

const OhNjo: React.FC = () => {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play().catch((error) => {
				console.error('Error playing audio:', error);
			});
		}
	}, []);

	return (
		<div className="loadingContainer">
			<FloatingBackButton
				onBackButtonClicked={() => window.history.back()}
			/>
			<div className="loadingText">
				<div className="title">Ey bat...</div>
				<div className="description">
					Ya iPhone toi. Ya dan have access to thish feature. Sholly
				</div>

				<img
					className="ultrawide"
					src="/time-to-egate-app/assets/wide-minna-of-doom.png"
					alt="Wide minna of doom!"
				/>
				<div className="description">
					Ya have been greeted by da wide minna of doom
				</div>
			</div>
			<audio
				ref={audioRef}
				src="/time-to-egate-app/assets/oh-my-god-bruh-oh-hell-nah.mp3"
				autoPlay
			/>
		</div>
	);
};

export default OhNjo;
