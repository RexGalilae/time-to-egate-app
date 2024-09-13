import { Schedule } from '../interfaces';
import { timeToMinutes, arrivalIsWithinNMinutesOf } from './time';

const csvPath = '/public/assets/schedule.csv';

/**
 * A function that reads the schedule.csv file, accepts a time and returns data where EGHQ is +- 30 minutes from the time in the form of an array of objects containing the derpature time, arrival time, and the duration.
 *
 * @param {string} time - The time to search for
 * @returns {Array<Schedule>} - An array of objects containing the departure time, arrival time, and the duration in minutes.
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
export const getSchedule = async (time: string): Promise<Schedule[]> => {
	const csvData = await fetchCsvData();

	console.log({ csvData });

	// Filter bus schedules that are +- 30 minutes from the given time
	const data = csvData.filter(arrivalIsWithinNMinutesOf(time));

	return data;
};

/**
 * A function that fetches the schedule.csv file and returns the data as an array of arrays.
 *
 * @returns {Array<Array<string>>} - An array of arrays containing the data from the CSV file.
 */
const fetchCsvData = async (): Promise<Schedule[]> => {
	const csvData = await fetch(csvPath).then((response) => response.text());

	// Parse the CSV data
	const csvArray = csvData.split('\r').map((row) => row.split(','));

	// Store the indices of the columns
	const departureIndex = csvArray[0].indexOf('3T-2');
	const arrivalIndex = csvArray[0].indexOf('EGHQ');

	// Remove the first row (column headers)
	csvArray.shift();

	return csvArray.map((row) => ({
		departure: row[departureIndex],
		arrival: row[arrivalIndex],
		duration:
			timeToMinutes(row[arrivalIndex]) -
			timeToMinutes(row[departureIndex]),
	}));
};
