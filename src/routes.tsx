import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import { MantineProvider } from '@mantine/core';

import './App.scss';
import '@mantine/core/styles.css';
import Loading from './pages/Loading';

const AppRoutes: React.FC = () => {
	return (
		<MantineProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/loading" element={<Loading />} />
				</Routes>
			</Router>
		</MantineProvider>
	);
};

export default AppRoutes;
