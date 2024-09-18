import React, { useEffect, useMemo } from 'react';
import Sticker from '../components/Sticker/Sticker';
import { PAGE_ROUTES } from '../constants';
import { useQueryNavigate } from '../util/hooks';
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

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigateWithQuery(PAGE_ROUTES.SCHEDULES);
		}, 3000);

		return () => clearTimeout(timeout); // Clear the timeout when the component unmounts
	}, []); // Empty dependency array to run the effect only once

	return (
		<div className="loadingContainer">
			<div className="loadingText">
				<div className="title">Processing...</div>
				<div className="description">
					We doing hella analysis njow. Once eet halas, toi can figule
					out when to wake up
				</div>
			</div>

			{fiftyFifty ? <YodaSticker /> : <UtyaSticker />}
		</div>
	);
};

export default Loading;
