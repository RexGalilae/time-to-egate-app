import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes.tsx';
import './index.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>,
);
