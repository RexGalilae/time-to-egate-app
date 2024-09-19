/**
 * A function that queries the key of an object by its value
 *
 * @param obj The object to query
 * @param value The value to search for
 * @returns The key of the object that has the value
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const key = getKeyByValue(obj, 2);
 * console.log(key); // b
 */
export function getKeyByValue<T>(obj: Record<string, T>, value: T): string {
	return Object.keys(obj).find((key) => obj[key] === value) ?? '';
}
