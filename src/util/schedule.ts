import { PLEEP_PARAMETERS_IN_HOURS, PleepParameterKey } from '../constants';
import { IPleepTimes, Schedule, ScheduleWithDelay } from '../interfaces';
import {
	timeToMinutes,
	arrivalIsWithinNMinutesOf,
	timeDifference,
	departureIsWithinNMinutesOf,
} from './time';

const csvPath = '/time-to-egate-app/assets/schedule.csv';

/**
 * A function that reads the schedule.csv file, accepts a time and returns data where EGHQ is +- 30 minutes from the time in the form of an array of objects containing the derpature time, arrival time, and the duration.
 *
 * @param {string} time - The time to search for
 * @param {string} from - The departure location
 * @param {string} to - The arrival location
 * @param {boolean} departAt - Whether to search for schedules that depart at the given time
 * @returns {Array<ScheduleWithDelay>} - An array of objects containing the departure time, arrival time, and the duration in minutes.
 *
 * @example
 * const time = '10:00';
 * const schedule = getSchedule(time);
 * console.log(schedule);
 * // Output: [
 * //   { departure: '09:30', arrival: '10:30', duration: '1:00' },
 * //   { departure: '10:00', arrival: '11:00', duration: '1:00' },
 * //   { departure: '10:30', arrival: '11:30', duration: '1:00' }
 * // ]
 */
export const getSchedule = async (
	time: string,
	from = '3T-2',
	to = 'EGHQ',
	departAt = false,
): Promise<ScheduleWithDelay[]> => {
	if (from === 'EGHQ') {
		from = 'EGHQ-O';
	} else if (to === 'EGHQ-O') {
		to = 'EGHQ';
	}

	const csvData = await fetchCsvData(from, to);

	let data: ScheduleWithDelay[] = [];

	if (departAt) {
		// Filter bus schedules that are + 30 minutes from the given time
		data = csvData
			.filter(departureIsWithinNMinutesOf(time))
			.map(calculateDelayFromCurrentTime(time));
	} else {
		// Filter bus schedules that are +- 30 minutes from the given time
		data = csvData
			.filter(arrivalIsWithinNMinutesOf(time))
			.map(calculateDelayFromGoalArrivalTime(time));
	}

	return data;
};

/**
 * A function that fetches the schedule.csv file and returns the data as an array of arrays.
 *
 * @returns {Array<Array<string>>} - An array of arrays containing the data from the CSV file.
 */
export const fetchCsvData = async (
	from = '3T-2',
	to = 'EGHQ',
): Promise<Schedule[]> => {
	const csvData = await fetch(csvPath).then((response) => response.text());

	// Parse the CSV data
	const csvArray = csvData.split('\r').map((row) => row.split(','));

	// Store the indices of the columns
	const departureIndex = csvArray[0].indexOf(from);
	const arrivalIndex = csvArray[0].indexOf(to);

	// Remove the first row (column headers)
	csvArray.shift();

	return csvArray.map((row, i) => ({
		_id: i.toString(),
		departure: row[departureIndex].trim(),
		arrival: row[arrivalIndex].trim(),
		duration:
			timeToMinutes(row[arrivalIndex]) -
			timeToMinutes(row[departureIndex]),
	}));
};

/**
 * A function that accepts a departure time and returns an object containing the pleep times for each key in PLEEP_PARAMETERS_IN_HOURS.
 *
 * @param {string} departureTime - The departure time
 * @returns {IPleepTimes} - An object containing the pleep times for each key in PLEEP_PARAMETERS_IN_HOURS.
 *
 * @example
 * const departureTime = '10:00';
 * const pleepTimes = getPleepTimes(departureTime);
 * console.log(pleepTimes);
 * // Output: {
 * //   SHOWER: '11:15',
 * //   NAP: '11:30',
 * //   PLEEP: '16:00'
 * // }
 */
export const getPleepTimes = (departureTime: string): IPleepTimes => {
	const departureMinutes = timeToMinutes(departureTime);

	const pleepTimes = Object.keys(PLEEP_PARAMETERS_IN_HOURS).reduce(
		(acc, key) => {
			const minutes =
				departureMinutes -
				PLEEP_PARAMETERS_IN_HOURS[key as PleepParameterKey] * 60;
			const hours = Math.floor(minutes / 60);
			const flooredMinutes = Math.floor(minutes / 5) * 5;
			const minutesString = (flooredMinutes % 60)
				.toString()
				.padStart(2, '0');

			return {
				...acc,
				[key]: `${hours}:${minutesString}`,
			};
		},
		{} as IPleepTimes,
	);

	return pleepTimes;
};

function calculateDelayFromGoalArrivalTime(
	time: string,
): (value: Schedule) => ScheduleWithDelay {
	return (row) => {
		// Calculate the delay considering the cyclical nature of time
		const delay = timeDifference(time, row.arrival);

		return {
			...row,
			delay,
		};
	};
}

function calculateDelayFromCurrentTime(
	time: string,
): (value: Schedule) => ScheduleWithDelay {
	return (row) => {
		// Calculate the delay considering the cyclical nature of time
		const delay = timeDifference(time, row.departure);

		return {
			...row,
			delay,
		};
	};
}
