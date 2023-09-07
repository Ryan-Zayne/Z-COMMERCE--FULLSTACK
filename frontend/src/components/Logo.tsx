import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { logo } from '../assets/brand';

function Logo({ className = '' }: { className?: string }) {
	return (
		<Link
			className={twMerge(`block h-[4.47rem] w-[13rem] md:h-[5.5rem] md:w-[16rem] ${className}`)}
			to={'/'}
		>
			<img className="h-full" src={logo} alt="" />
		</Link>
	);
}
export default Logo;
