import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes.tsx';
import './index.scss';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/time-to-egate-app/service-worker.js')
			.then(
				(registration) => {
					console.log(
						'ServiceWorker registration successful with scope: ',
						registration.scope,
					);
				},
				(error) => {
					console.log('ServiceWorker registration failed: ', error);
				},
			);
	});
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>,
);
