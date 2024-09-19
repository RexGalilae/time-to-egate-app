import { describe, it, expect } from 'vitest';
import {
	timeToMinutes,
	arrivalIsWithinNMinutesOf,
	departureIsWithinNMinutesOf,
	convertToTwelveHourFormat,
	timeDifference,
	subtractMinutes,
} from '../util/time';

describe('timeToMinutes', () => {
	it('should convert time to minutes', () => {
		expect(timeToMinutes('10:30')).toBe(630);
		expect(timeToMinutes('00:00')).toBe(0);
		expect(timeToMinutes('23:59')).toBe(1439);
		expect(timeToMinutes(undefined)).toBe(0);
	});
});

describe('arrivalIsWithinNMinutesOf', () => {
	it('should check if arrival is within N minutes of given time', () => {
		const schedule = { arrival: '10:45' };
		const checkArrival = arrivalIsWithinNMinutesOf('10:30', 30);
		expect(checkArrival(schedule)).toBe(true);

		const checkArrival2 = arrivalIsWithinNMinutesOf('10:30', 10);
		expect(checkArrival2(schedule)).toBe(false);
	});
});

describe('departureIsWithinNMinutesOf', () => {
	it('should check if departure is within N minutes of given time', () => {
		const schedule = { departure: '10:45' };
		const checkDeparture = departureIsWithinNMinutesOf('10:30', 30);
		expect(checkDeparture(schedule)).toBe(true);

		const checkDeparture2 = departureIsWithinNMinutesOf('10:30', 10);
		expect(checkDeparture2(schedule)).toBe(false);
	});
});

describe('convertToTwelveHourFormat', () => {
	it('should convert 24-hour format to 12-hour format', () => {
		expect(convertToTwelveHourFormat('13:00')).toBe('1:00 PM');
		expect(convertToTwelveHourFormat('00:00')).toBe('12:00 AM');
		expect(convertToTwelveHourFormat('12:00')).toBe('12:00 PM');
		expect(convertToTwelveHourFormat('23:59')).toBe('11:59 PM');
	});
});

describe('timeDifference', () => {
	it('should return the difference in minutes between two times', () => {
		expect(timeDifference('23:00', '01:00')).toBe(120);
		expect(timeDifference('01:00', '23:00')).toBe(-120);
		expect(timeDifference('12:00', '12:00')).toBe(0);
		expect(timeDifference('00:00', '23:59')).toBe(-1);
	});
});

describe('subtractMinutes', () => {
	it('should subtract minutes from a given time', () => {
		expect(subtractMinutes('01:00', 30)).toBe('0:30');
		expect(subtractMinutes('00:30', 60)).toBe('23:30');
		expect(subtractMinutes('12:00', 720)).toBe('0:00');
		expect(subtractMinutes('00:00', 1)).toBe('23:59');
	});
});
