import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { ScheduleWithDelay } from '../../interfaces.ts';

import trainIcon from '../../assets/icons/train.svg';

import './ScheduleCard.scss';

interface ScheduleCardProps {
	selected: boolean;
	scheduleData: ScheduleWithDelay;
	onScheduleClick: (_id: string) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
	selected,
	scheduleData,
	onScheduleClick,
}) => {
	const delayReadable = (delay: number) =>
		delay > 0 ? `+${delay}min` : `${delay}min`;

	return (
		<>
			<div
				className={`card ${selected ? 'selected' : ''}`}
				onClick={() => onScheduleClick(scheduleData._id)}
			>
				<div className="contentContainer">
					<div className="side">
						<div className="time">{scheduleData.departure}</div>
						<div className="delay">&nbsp;</div>
						<div className="label">Departure</div>
					</div>
					<div className="center">
						<img src={trainIcon} className="icon" />
						<div className="duration"></div>
					</div>
					<div className="side">
						<div className="time">{scheduleData.arrival}</div>
						<div
							className={`delay ${
								scheduleData.delay > 0 ? 'danger' : 'safe'
							}`}
						>
							{delayReadable(scheduleData.delay)}
						</div>
						<div className="label">Arrival</div>
					</div>
				</div>
			</div>
		</>
	);
};

const ScheduleCardGroup: React.FC<{
	selectedScheduleId: string;
	onScheduleSelect: (_id: string) => void;
	schedules: ScheduleWithDelay[];
}> = ({ selectedScheduleId, onScheduleSelect, schedules }) => {
	return (
		<div className="scheduleCardGroup">
			<TransitionGroup>
				{schedules.map((schedule, index) => (
					<CSSTransition
						key={schedule._id}
						timeout={500}
						classNames="topFade"
						style={{ transitionDelay: `${index * 0.1}s` }}
					>
						<ScheduleCard
							key={schedule._id}
							selected={selectedScheduleId === schedule._id}
							scheduleData={schedule}
							onScheduleClick={onScheduleSelect}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default React.memo(ScheduleCardGroup);
