import React from 'react';
import styles from './FooterBar.module.scss';
import Button, { ButtonProps } from '../Button/Button';

interface FooterBarProps extends ButtonProps {
	label: string;
}

const FooterBar: React.FC<FooterBarProps> = ({ onClick, label }) => {
	return (
		<div className={styles.footerBar}>
			<Button onClick={onClick}>{label}</Button>
		</div>
	);
};

export default FooterBar;
