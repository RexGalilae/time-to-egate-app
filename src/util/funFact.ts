export const fetchFunFact = async () => {
	const response = await fetch('/time-to-egate-app/assets/facts.json');

	const data = await response.json();
	const randomIndex = Math.floor(Math.random() * data.length);

	localStorage.setItem('funFact', data[randomIndex]);
};
