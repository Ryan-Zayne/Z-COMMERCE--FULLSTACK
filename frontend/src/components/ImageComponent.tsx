/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useThemeStore } from '../store/zustand/themeStore';

type ImageComponentProps = React.ComponentPropsWithRef<'img'> & {
	src: string;
	blurSrc?: string;
	className?: string;
	wrapperClassName?: string;
	isDynamicImage?: boolean;
	fetchpriority?: 'auto' | 'low' | 'high';
	onClick?: React.MouseEventHandler;
};

const img = new Image();

function ImageComponent(props: ImageComponentProps) {
	const {
		src,
		blurSrc = '',
		className = '',
		wrapperClassName = '',
		isDynamicImage = false,
		onClick,
		...restOfProps
	} = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const isDarkMode = useThemeStore((state) => state.isDarkMode);

	useEffect(() => {
		img.src = src;

		const handleImageLoad = () => setIsImageLoaded(true);

		if (img.complete) {
			handleImageLoad();
		} else {
			img.addEventListener('load', handleImageLoad);
		}

		return () => {
			if (img.complete) return;
			img.removeEventListener('load', handleImageLoad);
		};
	}, [src]);

	if (isDynamicImage) {
		return (
			<div
				className={twMerge(
					`h-full w-full`,
					[
						!isImageLoaded &&
							`relative bg-white/[0.17] invert ${isDarkMode && 'bg-black/[0.17] invert-0'}`,
					],
					[wrapperClassName]
				)}
				onClick={onClick}
			>
				{!isImageLoaded && (
					<span className=" absolute inset-0 z-[1] animate-zoom [background-image:linear-gradient(100deg,_transparent_20%,_hsla(0,0%,100%,0.3)_50%,_transparent_80%)]" />
				)}

				<img
					className={twMerge(`object-cover `, [isImageLoaded && 'h-full'], [className])}
					src={src}
					alt=""
					{...restOfProps}
				/>
			</div>
		);
	}

	return (
		<img
			src={isImageLoaded ? src : blurSrc}
			className={twMerge(`object-cover`, className)}
			alt=""
			{...restOfProps}
		/>
	);
}

export default ImageComponent;
