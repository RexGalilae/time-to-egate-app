import React from 'react';

import styles from './Inputs.module.scss';

interface DropdownProps {
	value?: string;
	label: string;
	options: string[];
	disabled?: boolean;
	onChange: (value: string) => void;
	error: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
	value,
	label,
	options,
	disabled = false,
	onChange,
	error,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className={styles.root}>
			<label className={styles.label}>{label}</label>
			<select
				className={styles.input}
				onChange={handleChange}
				{...{ value, disabled }}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<div className={styles.error}>{error}</div>
		</div>
	);
};

export default Dropdown;
