import { Schedule } from '../interfaces';

/**
 * A function that accepts a time string and returns the time in minutes.
 *
 * @param {string} time - The time to convert to minutes.
 * @returns {number} - The time in minutes.
 *
 * @example
 * const time = '10:30';
 * const minutes = timeToMinutes(time);
 * console.log(minutes);
 * // Output: 630
 */
export const timeToMinutes = (time: string | undefined): number => {
	if (!time) {
		return 0;
	}

	const [hours, minutes] = time.split(':');

	return parseInt(hours) * 60 + parseInt(minutes);
};

/**
 * A function that accepts a time string and returns a function that checks if the given schedule is within 30 minutes of the time.
 *
 * @param {string} time - The time to check against.
 * @param {number} intervalInMinutes - The interval in minutes to check against.
 * @returns {Function} - A function that accepts a schedule and returns a boolean.
 */
export const arrivalIsWithinNMinutesOf = (
	time: string,
	intervalInMinutes: number = 30,
): ((value: Schedule) => boolean) => {
	return (schedule) => {
		const arrivalTime = timeToMinutes(schedule.arrival);
		const searchTime = timeToMinutes(time);

		return (
			arrivalTime <= searchTime + intervalInMinutes &&
			arrivalTime >= searchTime - intervalInMinutes
		);
	};
};

/**
 * Converts time in 24-hour format to 12-hour format.
 *
 * @param {string} time - The time to convert to 12-hour format.
 * @returns {string} - The time in 12-hour format.
 *
 * @example
 * const time = '13:00';
 * const twelveHourTime = convertToTwelveHourFormat(time);
 * console.log(twelveHourTime);
 * // Output: '1:00 PM'
 */
export const convertToTwelveHourFormat = (time: string): string => {
	const [hours, minutes] = time.split(':');
	const hour = parseInt(hours) % 12 || 12;
	const period = parseInt(hours) < 12 ? 'AM' : 'PM';

	return `${hour}:${minutes} ${period}`;
};
