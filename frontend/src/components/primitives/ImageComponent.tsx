import { cnMerge } from "@/lib/utils/cn";
import { useState } from "react";

type ImageComponentProps = React.ComponentPropsWithRef<"img"> & {
	src: string;
	imageType: "hasFallback" | "hasSkeleton";
	blurSrc?: string;
	className?: string;
	wrapperClassName?: string;
	fetchpriority?: "auto" | "low" | "high";
};

/* eslint-disable react-hooks/rules-of-hooks */
const IMAGE_TYPE_LOOKUP = {
	hasFallback: (props: Omit<ImageComponentProps, "imageType">) => {
		const { src, blurSrc, className, ...restOfProps } = props;

		const [isImageLoaded, setIsImageLoaded] = useState(false);

		const handleImageLoad = () => setIsImageLoaded(true);

		return (
			<img
				src={isImageLoaded ? src : blurSrc}
				onLoad={handleImageLoad}
				className={cnMerge("object-cover", className)}
				alt=""
				{...restOfProps}
			/>
		);
	},

	hasSkeleton: (props: Omit<ImageComponentProps, "imageType">) => {
		const { src, className, wrapperClassName, onClick, ...restOfProps } = props;

		const [isImageLoaded, setIsImageLoaded] = useState(false);

		const handleImageLoad = () => setIsImageLoaded(true);

		return (
			<div
				className={cnMerge(
					"h-full w-full",

					!isImageLoaded && "relative bg-white/[0.17] invert dark:bg-black/[0.17] dark:invert-0",

					wrapperClassName
				)}
				onClick={onClick}
			>
				<span className="absolute inset-0 z-[1] hidden animate-zoom [background-image:linear-gradient(100deg,_transparent_20%,_hsla(0,0%,100%,0.3)_50%,_transparent_80%)] only:inline-block" />

				<img
					className={cnMerge("h-full object-cover", className)}
					onLoad={handleImageLoad}
					src={src}
					alt=""
					{...restOfProps}
				/>
			</div>
		);
	},
};

function ImageComponent(props: ImageComponentProps) {
	const { imageType, ...restOfProps } = props;

	const { [imageType]: Image } = IMAGE_TYPE_LOOKUP;

	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Image {...restOfProps} />;
}

export default ImageComponent;
