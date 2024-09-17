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
