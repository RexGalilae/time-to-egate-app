import { describe, it, expect, vi } from 'vitest';
import { getSchedule, getPleepTimes } from '../util/schedule';
import * as fs from 'fs';

vi.mock('../constants', () => ({
	PLEEP_PARAMETERS_IN_HOURS: {
		SHOWER: 1.25,
		NAP: 1.5,
		PLEEP: 6,
	},
}));

const mockCsvData = fs.readFileSync('src/assets/schedule.csv', 'utf-8');

global.fetch = vi.fn(() =>
	Promise.resolve({
		ok: true,
		status: 200,
		headers: new Headers(),
		text: () => Promise.resolve(mockCsvData),
	} as Response),
);

describe('getSchedule', () => {
	it('should return the correct schedule for a given time', async () => {
		const time = '0:00';
		const expectedSchedule = [
			{
				_id: '54',
				departure: '23:30',
				arrival: '23:42',
				duration: 12,
				delay: -18,
			},
			{
				_id: '55',
				departure: '0:00',
				arrival: '0:12',
				duration: 12,
				delay: 12,
			},
		];

		const schedule = await getSchedule(time, '3T-2', 'EGHQ');
		expect(schedule).toEqual(expectedSchedule);
	});
});

describe('getPleepTimes', () => {
	it('should return the correct pleep times for a given departure time', () => {
		const departureTime = '10:00';
		const expectedPleepTimes = {
			SHOWER: '8:45',
			NAP: '8:30',
			PLEEP: '4:00',
		};

		const pleepTimes = getPleepTimes(departureTime);
		expect(pleepTimes).toEqual(expectedPleepTimes);
	});
});
