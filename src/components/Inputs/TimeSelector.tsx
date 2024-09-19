import React, { useEffect, useState } from 'react';

import styles from './Inputs.module.scss';

interface TimeSelectorProps {
	defaultTime?: string;
	label: string;
	onChange: (time: string) => void;
	onSubmit: () => void;
	error: React.ReactNode;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
	label,
	defaultTime = '1:15',
	onChange,
	onSubmit,
	error,
}) => {
	const [time, setTime] = useState(defaultTime || '');

	useEffect(() => {
		setTime(defaultTime);
	}, [defaultTime]);

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
		// Convert time to 24-hour format and pass it to the onChange callback
		const timeIn24hFormat = convertTo24hFormat(event.target.value);
		onChange(timeIn24hFormat);
	};

	const convertTo24hFormat = (time: string) => {
		const [hours, minutes, period] = time.split(':');
		let hoursIn24hFormat = parseInt(hours, 10);

		if (period === 'PM' && hoursIn24hFormat < 12) {
			hoursIn24hFormat += 12;
		} else if (period === 'AM' && hoursIn24hFormat === 12) {
			hoursIn24hFormat = 0;
		}

		return `${hoursIn24hFormat.toString().padStart(2, '0')}:${minutes}`;
	};

	// When the user hits Enter, fire the onSubmit callback
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onSubmit();
		}
	};

	return (
		<div className={styles.root}>
			<label className={styles.label}>{label}</label>
			<input
				className={styles.input}
				type="time"
				value={time}
				onChange={handleTimeChange}
				onKeyDown={handleKeyPress}
				step="60"
				pattern="[0-9]{2}:[0-9]{2} [APap][mM]"
			/>
			<div className={styles.error}>{error}</div>
		</div>
	);
};

export default TimeSelector;
