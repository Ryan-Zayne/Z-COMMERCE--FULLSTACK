import loadingSpinner from '@/assets/loadingSpinner.svg';
import Portal from '@/components/Portal';

function Loader({ type = 'regular' }: { type?: 'regular' | 'auth' }) {
	const LOADER_LOOKUP = {
		regular: () => (
			<Portal>
				<aside className="loader-container">
					<div className="dank-ass-loader">
						<div className="row">
							<div className="arrow up outer outer-18" />
							<div className="arrow down outer outer-17" />
							<div className="arrow up outer outer-16" />
							<div className="arrow down outer outer-15" />
							<div className="arrow up outer outer-14" />
						</div>
						<div className="row">
							<div className="arrow up outer outer-1" />
							<div className="arrow down outer outer-2" />
							<div className="arrow up inner inner-6" />
							<div className="arrow down inner inner-5" />
							<div className="arrow up inner inner-4" />
							<div className="arrow down outer outer-13" />
							<div className="arrow up outer outer-12" />
						</div>
						<div className="row">
							<div className="arrow down outer outer-3" />
							<div className="arrow up outer outer-4" />
							<div className="arrow down inner inner-1" />
							<div className="arrow up inner inner-2" />
							<div className="arrow down inner inner-3" />
							<div className="arrow up outer outer-11" />
							<div className="arrow down outer outer-10" />
						</div>
						<div className="row">
							<div className="arrow down outer outer-5" />
							<div className="arrow up outer outer-6" />
							<div className="arrow down outer outer-7" />
							<div className="arrow up outer outer-8" />
							<div className="arrow down outer outer-9" />
						</div>
					</div>
				</aside>
			</Portal>
		),

		auth: () => (
			<Portal>
				<aside className="fixed inset-0 z-[600] flex select-none items-center justify-center bg-black/60 backdrop-blur-[1.5px]">
					<img
						className="aspect-square w-[30rem] max-md:translate-y-[-4rem] lg:w-[30%]"
						src={loadingSpinner}
						alt=""
					/>
				</aside>
			</Portal>
		),
	};

	return LOADER_LOOKUP[type]();
}
export default Loader;