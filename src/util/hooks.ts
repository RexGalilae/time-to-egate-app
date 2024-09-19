// A hook that extends the functionality of useNavigate and useLocation from react-router-dom.
// It provides an object with the query parameters and a function to navigate to a new location with query parameters.

import { useNavigate, useLocation } from 'react-router-dom';

export function useQueryNavigate<IQuery extends Record<string, string>>() {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateWithQuery = (path: string, query?: Partial<IQuery>) => {
		const searchParams = new URLSearchParams(location.search);

		if (query) {
			Object.keys(query).forEach((key) => {
				if (query[key] !== undefined) {
					searchParams.set(key, query[key] as string);
				}
			});
		}

		navigate(path + '?' + searchParams.toString());
	};

	const processedQuery: Record<string, string> = {};

	if (location.search) {
		const searchParams = new URLSearchParams(location.search);

		searchParams.forEach((value, key) => {
			processedQuery[key] = value;
		});
	}

	return { navigateWithQuery, query: processedQuery as Partial<IQuery> };
}
