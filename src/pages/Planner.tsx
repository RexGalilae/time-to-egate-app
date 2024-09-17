import React, { useMemo } from 'react';
import TaskGroup from '../components/PlannedTasks/PlannedTasks';
import FooterBar from '../components/FooterBar/FooterBar';
import { useQueryNavigate } from '../util/hooks';
import { QueryState, ScheduleWithDelay } from '../interfaces';
import { ScheduleCard } from '../components/ScheduleCard/ScheduleCard';
import Header from '../components/Header/Header';
import { getPleepTimes } from '../util/schedule';
import { PAGE_ROUTES } from '../constants';

const Planner: React.FC = () => {
	const { query, navigateWithQuery } =
		useQueryNavigate<Partial<QueryState>>();

	// Fetch the selected schedule data from the query
	const selectedScheduleData = useMemo(() => {
		if (query.selectedScheduleData) {
			return JSON.parse(
				atob(query.selectedScheduleData as string),
			) as ScheduleWithDelay;
		}
	}, [query.selectedScheduleData]);

	const plannedTasks = useMemo(() => {
		if (selectedScheduleData) {
			const pleepTimes = getPleepTimes(selectedScheduleData?.departure);

			return [
				{
					title: 'Toi could sho at...',
					stickerSrc: '/assets/pleepind-utya.json',
					time: pleepTimes.PLEEP,
				},
				{
					title: '...ol if toi fancies a nap...',
					stickerSrc: '/assets/pleepind-yoda.json',
					time: pleepTimes.NAP,
				},
				{
					title: '...bat make sule toi wake up in tim to...',
					stickerSrc: '/assets/nahaind-utya.json',
					time: pleepTimes.SHOWER,
				},
			];
		}
	}, [selectedScheduleData]);

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className="pageContainer">
			<Header onBackButtonClicked={handleGoBack} />
			<h2>Toi's Schedule</h2>
			{selectedScheduleData && (
				<ScheduleCard
					selected
					scheduleData={selectedScheduleData}
					onScheduleClick={() => {}}
				/>
			)}
			{plannedTasks && <TaskGroup tasks={plannedTasks} />}
			<FooterBar
				label="Set an Alarm"
				onClick={() => {
					navigateWithQuery(PAGE_ROUTES.OHNJO);
				}}
			/>
		</div>
	);
};

export default Planner;
