import { cnMerge } from '@/lib/utils/cn.ts';
import { useEffect, useState } from 'react';

type ImageComponentProps = React.ComponentPropsWithRef<'img'> & {
	src: string;
	imageType: 'hasFallback' | 'hasSkeleton';
	blurSrc?: string;
	className?: string;
	wrapperClassName?: string;
	fetchpriority?: 'auto' | 'low' | 'high';
};

const img = new Image();

function ImageComponent(props: ImageComponentProps) {
	const {
		src,
		imageType,
		blurSrc = '',
		className = '',
		wrapperClassName = '',
		onClick,
		...restOfProps
	} = props;
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(
		function imageLoadEffect() {
			img.src = src;

			const handleImageLoad = () => setIsImageLoaded(true);

			if (img.complete) {
				handleImageLoad();
			} else {
				img.addEventListener('load', handleImageLoad);
			}

			return () => img.removeEventListener('load', handleImageLoad);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[src]
	);

	const IMAGE_TYPE_LOOKUP = {
		hasFallback: () => (
			<img
				src={isImageLoaded ? src : blurSrc}
				className={cnMerge('object-cover', className)}
				alt=""
				{...restOfProps}
			/>
		),

		hasSkeleton: () => (
			<div
				className={cnMerge(
					'h-full w-full',
					[!isImageLoaded && 'relative bg-white/[0.17] invert dark:bg-black/[0.17] dark:invert-0'],
					[wrapperClassName]
				)}
				onClick={onClick}
			>
				{!isImageLoaded ? (
					<span className="absolute inset-0 z-[1] animate-zoom [background-image:linear-gradient(100deg,_transparent_20%,_hsla(0,0%,100%,0.3)_50%,_transparent_80%)]" />
				) : (
					<img
						className={cnMerge('object-cover', [isImageLoaded && 'h-full'], [className])}
						src={src}
						alt=""
						{...restOfProps}
					/>
				)}
			</div>
		),

		default: () => {
			throw new Error(`Case ${imageType} is unhandled`);
		},
	};

	return IMAGE_TYPE_LOOKUP[imageType]?.() ?? IMAGE_TYPE_LOOKUP.default();
}

export default ImageComponent;
