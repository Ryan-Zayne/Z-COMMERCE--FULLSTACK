import { cnMerge } from "@/lib/utils/cn";
import { useState } from "react";

type ImageComponentProps = React.ComponentPropsWithRef<"img"> & {
	blurSrc?: string;
	className?: string;
	classNames?: {
		image: string;
		wrapper: string;
	};
	fetchPriority?: "auto" | "high" | "low";
	imageType?: "hasFallback" | "hasSkeleton";
	wrapperClassName?: string;
};

type ImageTypeProps = Omit<ImageComponentProps, "imageType"> & {
	handleImageLoad: () => void;
	isImageLoaded: boolean;
};

const IMAGE_TYPE_LOOKUP = {
	hasFallback: (props: ImageTypeProps) => {
		const { blurSrc, className, handleImageLoad, isImageLoaded, src, ...restOfProps } = props;

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

	hasSkeleton: (props: ImageTypeProps) => {
		const { className, classNames, handleImageLoad, isImageLoaded, onClick, src, ...restOfProps } =
			props;

		return (
			<div
				className={cnMerge(
					!isImageLoaded && "relative bg-white/[0.17] invert dark:bg-black/[0.17] dark:invert-0",
					classNames?.wrapper
				)}
				onClick={onClick}
			>
				<span
					className="absolute inset-0 z-[1] hidden animate-zoom
						[background-image:linear-gradient(100deg,_transparent_20%,_hsla(0,0%,100%,0.3)_50%,_transparent_80%)]
						only:inline-block"
				/>

				<img
					className={cnMerge("h-full object-cover", classNames?.image, className)}
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
	const { imageType = "hasSkeleton", ...restOfProps } = props;
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const { [imageType]: ImageType } = IMAGE_TYPE_LOOKUP;

	return (
		<ImageType
			isImageLoaded={isImageLoaded}
			handleImageLoad={() => setIsImageLoaded(true)}
			{...restOfProps}
		/>
	);
}

export { ImageComponent };
