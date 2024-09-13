import React from 'react';
import './App.scss';
import FooterBar from './components/FooterBar/FooterBar';

function App() {
	return (
		<div className="appContainer">
			<div className="stickerContainer">
				<img className="sticker" src="/assets/heyyo-utya.gif" alt="" />
			</div>
			<div className="title"></div>
			<input type="text" />
			<FooterBar
				label="Submit"
				onClick={() => {
					console.log('Button clicked');
				}}
			/>
		</div>
	);
}

export default App;
