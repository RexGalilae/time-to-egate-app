import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Sticker from '../Sticker/Sticker';

import './PlannedTasks.scss';

export interface ITask {
	title: string;
	stickerSrc: string;
	time: string;
}

interface TaskGroupProps {
	tasks: ITask[];
}

const Task: React.FC<ITask> = ({ title, stickerSrc, time }) => {
	return (
		<>
			<div className="task">
				<div className="taskTitle">{title}</div>
				<div className="taskDetails">
					<div className="taskStickerContainer">
						<Sticker animationPath={stickerSrc} />
					</div>
					<div className="taskTime">{time}</div>
				</div>
			</div>
		</>
	);
};

const TaskGroup: React.FC<TaskGroupProps> = ({ tasks }) => {
	return (
		<div className="taskGroup">
			<TransitionGroup>
				{tasks.map((task, index) => (
					<CSSTransition
						key={index}
						timeout={300}
						classNames="topFade"
						style={{ transitionDelay: `${index * 0.1}s` }}
					>
						<Task key={index} {...task} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
};

export default TaskGroup;
