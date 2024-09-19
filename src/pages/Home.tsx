import React, { useEffect, useMemo } from 'react';
import FooterBar from '../components/FooterBar/FooterBar';
import Sticker from '../components/Sticker/Sticker';
import { useForm } from '@mantine/form';
import Dropdown from '../components/Inputs/Dropdown';
import TimeSelector from '../components/Inputs/TimeSelector';
import { PAGE_ROUTES } from '../constants';

import { useQueryNavigate } from '../util/hooks';
import { QueryState } from '../interfaces';

import { fetchFunFact } from '../util/funFact';

// interface HomePageProps {}

const HomePage: React.FC = () => {
	// A useMemo that fetches a random fun fact from the internet
	useEffect(() => {
		fetchFunFact();
	}, []);

	const { query, navigateWithQuery } =
		useQueryNavigate<Partial<QueryState>>();

	const targetTimeFromQuery = useMemo(
		() => query.targetTime,
		[query.targetTime],
	);

	const form = useForm({
		initialValues: {
			from: 'Garhoud Tower 2',
			to: 'Emirates HQ',
			time: targetTimeFromQuery,
		},
		validate: {
			from: (value) => (value ? null : 'Select 1 is required'),
			to: (value) => (value ? null : 'Select 2 is required'),
			time: (value) => (value ? null : 'Time is required'),
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		console.log(values);
		navigateWithQuery(PAGE_ROUTES.LOADING, {
			targetTime: values.time,
		});
	};

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
					options={['Garhoud Tower 2']}
					{...form.getInputProps('from')}
					error={form.errors.from}
				/>

				<Dropdown
					label="To"
					options={['Emirates HQ']}
					{...form.getInputProps('to')}
					error={form.errors.to}
				/>

				<TimeSelector
					label="eGate Time"
					defaultTime={form.values.time}
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
