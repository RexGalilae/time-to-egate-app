export interface Schedule {
	_id: string;
	departure: string;
	arrival: string;
	duration: number;
}

export interface ScheduleWithDelay extends Schedule {
	delay: number;
}

export interface QueryState {
	from: string;
	to: string;
	targetTime: string;
	selectedScheduleData: string;
}

export interface IPleepTimes {
	SHOWER: string;
	NAP: string;
	PLEEP: string;
}
