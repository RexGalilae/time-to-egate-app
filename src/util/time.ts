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

		const minutesInDay = 1440;
		const lowerBound =
			(searchTime - intervalInMinutes + minutesInDay) % minutesInDay;
		const upperBound = (searchTime + intervalInMinutes) % minutesInDay;

		if (lowerBound <= upperBound) {
			return arrivalTime >= lowerBound && arrivalTime <= upperBound;
		} else {
			return arrivalTime >= lowerBound || arrivalTime <= upperBound;
		}
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

/**
 * A function that accepts two times and returns the difference in minutes.
 * It accounts for the cyclical nature of time.
 *
 * @param {string} from - The first time.
 * @param {string} to - The second time.
 * @returns {number} - The difference in minutes.
 *
 * @example
 * const from = '23:00';
 * const to = '01:00';
 * const difference = timeDifference(from, to);
 * console.log(difference);
 * // Output: 120
 */
export const timeDifference = (from: string, to: string): number => {
	const minutes1 = timeToMinutes(from);
	const minutes2 = timeToMinutes(to);

	let difference = minutes2 - minutes1;
	if (difference < -720) {
		difference += 1440;
	} else if (difference > 720) {
		difference -= 1440;
	}

	return difference;
};
