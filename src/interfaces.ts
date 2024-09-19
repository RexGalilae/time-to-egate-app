import { LocationKey } from './constants';

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
	from: LocationKey;
	to: LocationKey;
	targetTime: string;
	selectedScheduleData: string;

	[key: string]: string;
}

export interface IPleepTimes {
	SHOWER: string;
	NAP: string;
	PLEEP: string;
}
