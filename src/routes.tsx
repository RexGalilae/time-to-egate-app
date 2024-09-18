import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import './App.scss';
import '@mantine/core/styles.css';
import Loading from './pages/Loading';
import Schedules from './pages/Schedules';

import { PAGE_ROUTES } from './constants';
import TransitionWrapper from './components/TransitionWrapper/TransitionWrapper';
import Planner from './pages/Planner';
import OhNjo from './pages/OhNjo';

const AppRoutes: React.FC = () => {
	const basename =
		process.env.NODE_ENV === 'production' ? '/time-to-egate-app' : '';

	return (
		<Router {...{ basename }}>
			<TransitionWrapper>
				<Routes>
					<Route path={PAGE_ROUTES.HOME} element={<Home />} />
					<Route path={PAGE_ROUTES.LOADING} element={<Loading />} />
					<Route
						path={PAGE_ROUTES.SCHEDULES}
						element={<Schedules />}
					/>
					<Route path={PAGE_ROUTES.PLANNER} element={<Planner />} />
					<Route path={PAGE_ROUTES.OHNJO} element={<OhNjo />} />
					<Route path="*" element={<div>404 Not Found</div>} />
				</Routes>
			</TransitionWrapper>
		</Router>
	);
};

export default AppRoutes;
