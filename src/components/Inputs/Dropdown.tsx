import React, { useState } from 'react';

import styles from './Inputs.module.scss';

interface DropdownProps {
	label: string;
	options: string[];
	onChange: (value: string) => void;
	error: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	onChange,
	error,
}) => {
	const [selected, setSelected] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(e.target.value);
		onChange(e.target.value);
	};

	return (
		<div className={styles.root}>
			<label className={styles.label}>{label}</label>
			<select
				className={styles.input}
				value={selected}
				onChange={handleChange}
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
