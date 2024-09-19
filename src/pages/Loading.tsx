import React, { useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';

import Sticker from '../components/Sticker/Sticker';

import { useQueryNavigate } from '../util/hooks';

import { PAGE_ROUTES } from '../constants';
import { QueryState } from '../interfaces';

const YodaSticker = () => (
	<Sticker
		className="stickerContainer"
		animationPath={`/time-to-egate-app/assets/thinking-yoda.json`}
	/>
);

const UtyaSticker = () => (
	<Sticker
		className="stickerContainer"
		animationPath={`/time-to-egate-app/assets/thinking-utya.json`}
	/>
);

const Loading: React.FC = () => {
	const { navigateWithQuery } = useQueryNavigate<Partial<QueryState>>();

	const fiftyFifty = useMemo(() => Math.random() < 0.5, []);

	// Retrieve the fun fact from the local storage
	const funFact = useMemo(() => {
		const fact = localStorage.getItem('funFact')?.replace(/\n/g, '<br />');
		return fact || 'Toi labyuuu ❤️❤️❤️';
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigateWithQuery(PAGE_ROUTES.SCHEDULES);
		}, 5000);

		return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array to run the effect only once

	return (
		<div className="loadingContainer">
			<div className="loadingText">
				<div className="title">Processing...</div>
				<div className="description">
					We doing hella analysis njow. Once eet halas, toi can figule
					out when to wake up
				</div>
				{fiftyFifty ? <YodaSticker /> : <UtyaSticker />}
				{funFact && (
					<>
						<div className="subtitle">Da ya kna?</div>
						<div
							className="description"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(funFact),
							}}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Loading;
