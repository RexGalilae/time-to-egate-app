export const PLEEP_PARAMETERS_IN_HOURS = {
	SHOWER: 1.25,
	NAP: 1.25 + 1.5,
	PLEEP: 1.25 + 6,
} as const;

export type PleepParameterKey = keyof typeof PLEEP_PARAMETERS_IN_HOURS;

export const PAGE_ROUTES = {
	HOME: '/',
	LOADING: '/loading',
	SCHEDULES: '/schedules',
	PLANNER: '/planner',
	OHNJO: '/oh-njo',
};

export const locationOptions = ['Garhoud Tower 2', 'Emirates HQ'] as const;

export type LocationOption = (typeof locationOptions)[number];

export const locationKeys = ['3T-2', 'EGHQ-O'] as const;

export type LocationKey = (typeof locationKeys)[number];

export const locationOptionToScheduleKey: {
	[K in LocationOption]: LocationKey;
} = {
	'Garhoud Tower 2': '3T-2',
	'Emirates HQ': 'EGHQ-O',
} as const;
