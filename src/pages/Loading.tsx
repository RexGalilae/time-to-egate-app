import React from 'react';
import Sticker from '../components/Sticker/Sticker';
import { useNavigate } from 'react-router-dom';

const Loading: React.FC = () => {
	const navigation = useNavigate();

	setTimeout(() => {
		navigation('/');
	}, 3000);

	return (
		<div className="loadingContainer">
			<div className="loadingText">
				<div className="title">Processing...</div>
				<div className="description">
					We doing hella analysis njow. Once eet halas, toi can figule
					out when to wake up
				</div>
			</div>

			<Sticker
				className="stickerContainer"
				animationPath="/assets/thinking-utya.json"
			/>
		</div>
	);
};

export default Loading;
