import React, { useEffect, useState } from 'react';

import { getSchedule } from '../util/schedule';

import { QueryState, ScheduleWithDelay } from '../interfaces';

import ScheduleCardGroup from '../components/ScheduleCard/ScheduleCard';
import { useQueryNavigate } from '../util/hooks';
import FooterBar from '../components/FooterBar/FooterBar';
import { PAGE_ROUTES } from '../constants';
import Header from '../components/Header/Header';
import Sticker from '../components/Sticker/Sticker';

const Schedules: React.FC = () => {
	const { query, navigateWithQuery } = useQueryNavigate<QueryState>();

	const [schedules, setSchedules] = useState<ScheduleWithDelay[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (query.targetTime) {
				const data = await getSchedule(
					query.targetTime as string,
					query.from,
					query.to,
					query.from !== '3T-2',
				);
				setSchedules(data);
				setSelectedScheduleId(data[0]._id);
			} else {
				setSchedules([]);
			}
		};

		fetchData();
	}, [query.from, query.targetTime, query.to]);

	const [selectedScheduleId, setSelectedScheduleId] = useState('0');

	const handleScheduleSelect = (selectedScheduleId: string): void =>
		setSelectedScheduleId(selectedScheduleId);

	const handleFooterClick = () => {
		const selectedScheduleData = schedules.find(
			(schedule) => schedule._id === selectedScheduleId,
		);

		// Base64 encode the selected schedule data
		const selectedScheduleDataEncoded = btoa(
			JSON.stringify(selectedScheduleData),
		);

		navigateWithQuery(PAGE_ROUTES.PLANNER, {
			selectedScheduleData: selectedScheduleDataEncoded,
		});
	};

	const handleBackButtonClicked = () => {
		navigateWithQuery(PAGE_ROUTES.HOME);
	};

	const goingToeGate = query.from !== 'EGHQ-O';
	return (
		<div className="pageContainer">
			<Header onBackButtonClicked={handleBackButtonClicked} />
			{goingToeGate ? (
				<img
					className="stickerContainer"
					src="/time-to-egate-app/assets/here-you-go.webp"
					alt="Here you go!"
				/>
			) : (
				<>
					<div className="title">Run my toi run!</div>
					<Sticker animationPath="/time-to-egate-app/assets/flying-utya.json" />
				</>
			)}
			<ScheduleCardGroup
				selectedScheduleId={selectedScheduleId}
				onScheduleSelect={handleScheduleSelect}
				schedules={schedules}
			/>
			{goingToeGate && (
				<FooterBar
					label="Plan my Schedule"
					onClick={handleFooterClick}
				/>
			)}
		</div>
	);
};

export default Schedules;
