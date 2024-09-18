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
					stickerSrc: '/time-to-egate-app/assets/pleepind-utya.json',
					time: pleepTimes.PLEEP,
				},
				{
					title: '...ol if toi fancies a nap...',
					stickerSrc: '/time-to-egate-app/assets/pleepind-yoda.json',
					time: pleepTimes.NAP,
				},
				{
					title: '...bat make sule toi wake up in tim to...',
					stickerSrc: '/time-to-egate-app/assets/nahaind-utya.json',
					time: pleepTimes.SHOWER,
				},
			];
		}
	}, [selectedScheduleData]);

	const handleGoBack = () => {
		window.history.back();
	};

	const handleSetAlarmClicked = () => {
		// Check if the user is on a Samsung device
		const isSamsung = navigator.userAgent.includes('Samsung');

		if (isSamsung && plannedTasks) {
			const alarmHour = plannedTasks[2].time.split(':')[0];
			const alarmMinute = plannedTasks[2].time.split(':')[1];

			const intentString = `intent://com.sec.android.app.clockpackage/alarm#Intent;scheme=android-app;package=com.sec.android.app.clockpackage;action=android.intent.action.SET_ALARM;S.hour=${alarmHour};S.minutes=${alarmMinute};end`;

			window.location.href = intentString;
		} else {
			navigateWithQuery(PAGE_ROUTES.OHNJO);
		}
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
			<FooterBar label="Set an Alarm" onClick={handleSetAlarmClicked} />
		</div>
	);
};

export default Planner;
