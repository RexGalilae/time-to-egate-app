import Lottie, { LottieComponentProps } from 'lottie-react';
import React, { useEffect, useState } from 'react';

interface StickerProps extends Partial<LottieComponentProps> {
	animationPath: string;
}

const Sticker: React.FC<StickerProps> = ({ animationPath, ...props }) => {
	const [animationData, setAnimationData] = useState(null);

	useEffect(() => {
		const fetchAnimationData = async () => {
			const response = await fetch(animationPath);
			const data = await response.json();
			setAnimationData(data);
		};

		fetchAnimationData();
	}, [animationPath]);

	return <Lottie {...{ ...props, animationData }} />;
};

export default Sticker;
