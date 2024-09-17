import React from 'react';
import FooterBar from '../components/FooterBar/FooterBar';
import Sticker from '../components/Sticker/Sticker';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Inputs/Dropdown';
import TimeSelector from '../components/Inputs/TimeSelector';

// interface HomePageProps {}

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			select1: 'Garhoud Tower 2',
			select2: 'Emirates HQ',
			time: '',
		},
		validate: {
			select1: (value) => (value ? null : 'Select 1 is required'),
			select2: (value) => (value ? null : 'Select 2 is required'),
			time: (value) => (value ? null : 'Time is required'),
		},
	});

	const handleSubmit = (values: typeof form.values) => {
		console.log(values);
		navigate('/loading');
	};

	return (
		<div className="pageContainer">
			<div className="title">Ey when my bus gonna arriv?</div>
			<Sticker
				className="stickerContainer"
				animationPath="/assets/clock-yoda.json"
			/>
			<form className="" onSubmit={form.onSubmit(handleSubmit)}>
				<Dropdown
					label="From"
					options={['Garhoud Tower 2']}
					{...form.getInputProps('select1')}
					error={form.errors.select1}
				/>

				<Dropdown
					label="To"
					options={['Emirates HQ']}
					{...form.getInputProps('select2')}
					error={form.errors.select2}
				/>

				<TimeSelector
					label="eGate Time"
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
