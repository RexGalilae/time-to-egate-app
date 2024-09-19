import React, { useEffect, useMemo, useState } from 'react';
import FooterBar from '../components/FooterBar/FooterBar';
import Sticker from '../components/Sticker/Sticker';
import { useForm } from '@mantine/form';
import Dropdown from '../components/Inputs/Dropdown';
import TimeSelector from '../components/Inputs/TimeSelector';
import {
	locationOptionToScheduleKey,
	PAGE_ROUTES,
	LocationKey,
	LocationOption,
} from '../constants';

import { useQueryNavigate } from '../util/hooks';
import { QueryState } from '../interfaces';

import { fetchFunFact } from '../util/funFact';

import { getKeyByValue } from '../util/helpers';

const HomePage: React.FC = () => {
	// A useMemo that fetches a random fun fact from the internet
	useEffect(() => {
		fetchFunFact();
	}, []);

	const { query, navigateWithQuery } = useQueryNavigate<QueryState>();

	const [defaultTime, setDefaultTime] = useState('');

	useEffect(() => setDefaultTime(query.targetTime ?? ''), [query.targetTime]);

	const presetFromLocation = useMemo<LocationOption>(
		() =>
			(getKeyByValue<LocationKey>(
				locationOptionToScheduleKey,
				query.from as LocationKey,
			) as LocationOption) || 'Garhoud Tower 2',
		[query.from],
	);

	const form = useForm({
		initialValues: {
			from: presetFromLocation,
			to: (presetFromLocation === 'Garhoud Tower 2'
				? 'Emirates HQ'
				: 'Garhoud Tower 2') as LocationOption,
			time: query.targetTime ?? defaultTime,
		},
		validate: {
			from: (value) => (value ? null : 'From is required'),
			to: (value) => (value ? null : 'To is required'),
			time: (value) => (value ? null : 'Time is required'),
		},
		onValuesChange: (values) => {
			const computedToValue =
				values.from === 'Garhoud Tower 2'
					? 'Emirates HQ'
					: 'Garhoud Tower 2';

			form.setFieldValue('to', computedToValue);

			if (values.from === 'Emirates HQ') {
				const currTime = new Date().toTimeString().slice(0, 5);
				// Set time to current time if the user selects Emirates HQ
				setDefaultTime(currTime);
				form.setFieldValue('time', currTime);
			} else {
				// Reset time to the query if the user selects Garhoud Tower 2
				setDefaultTime(query.targetTime ?? '');
				form.setFieldValue('time', query.targetTime ?? '');
			}
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		console.log(values);
		navigateWithQuery(PAGE_ROUTES.LOADING, {
			from: locationOptionToScheduleKey[values.from],
			to: locationOptionToScheduleKey[values.to],
			targetTime: values.time,
		});
	};

	// const destinationOptions = useMemo(
	// 	() =>
	// 		form.values.from === 'Garhoud Tower 2'
	// 			? ['Emirates HQ']
	// 			: ['Garhoud Tower 2'],
	// 	[form.values.from],
	// );

	const timeInputLabel = useMemo(
		() =>
			form.values.from === 'Garhoud Tower 2'
				? 'eGate opens at'
				: 'Leave by',
		[form.values.from],
	);

	return (
		<div className="pageContainer">
			<div className="title">Ey when my bus gonna arriv?</div>
			<Sticker
				className="stickerContainer"
				animationPath="/time-to-egate-app/assets/clock-yoda.json"
			/>
			<form className="" onSubmit={form.onSubmit(handleSubmit)}>
				<Dropdown
					label="From"
					options={['Garhoud Tower 2', 'Emirates HQ']}
					{...form.getInputProps('from')}
					error={form.errors.from}
				/>

				<Dropdown
					label="To"
					options={['Emirates HQ', 'Garhoud Tower 2']}
					{...form.getInputProps('to')}
					error={form.errors.to}
					disabled
				/>

				<hr />

				<TimeSelector
					label={timeInputLabel}
					defaultTime={defaultTime}
					{...form.getInputProps('time')}
					onSubmit={form.onSubmit(handleSubmit)}
					error={form.errors.time}
				/>
			</form>
			<FooterBar label="Submit" onClick={form.onSubmit(handleSubmit)} />
		</div>
	);
};

export default HomePage;
