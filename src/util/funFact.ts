export const fetchFunFact = async () => {
	const response = await fetch(
		'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en',
		{
			headers: {
				'accept':
					'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
				'accept-language': 'en-US,en;q=0.7',
				'cache-control': 'max-age=0',
			},
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: null,
			method: 'GET',
		},
	);
	const data = await response.json();
	localStorage.setItem('funFact', data.text);
};
