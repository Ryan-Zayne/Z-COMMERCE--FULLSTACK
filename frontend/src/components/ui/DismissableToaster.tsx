import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { HiX } from 'react-icons/hi';

function DismissableToaster() {
	return (
		<Toaster
			toastOptions={{
				success: {
					style: {
						backgroundColor: 'hsl(153, 81%, 12%)',
						color: 'hsl(140, 100%, 71%)',
						border: '2px solid hsl(145, 91%, 23%)',
						paddingBlock: '1.3rem',
					},
				},
			}}
		>
			{(toastInstance) => (
				<ToastBar toast={toastInstance}>
					{({ icon, message }) => (
						<>
							{icon}
							{message}

							{toastInstance.type !== 'loading' && (
								<button
									className="ring-primary-400 rounded-full p-[0.25rem] transition hover:bg-gray-900 focus:outline-none focus-visible:ring"
									onClick={() => toast.dismiss(toastInstance.id)}
								>
									<HiX />
								</button>
							)}
						</>
					)}
				</ToastBar>
			)}
		</Toaster>
	);
}

export default DismissableToaster;
