import { Button, ImageComponent, getElementList } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { m } from "motion/react";

const coreValues = [
	{
		description: "We ensure all products meet our high standards",
		icon: "bi:shield-check",
		title: "Quality Assurance",
	},
	{
		description: "Your satisfaction is our top priority",
		icon: "bi:heart",
		title: "Customer First",
	},
	{
		description: "Constantly improving your shopping experience",
		icon: "bi:lightning",
		title: "Innovation",
	},
	{
		description: "Committed to eco-friendly practices",
		icon: "bi:globe",
		title: "Sustainability",
	},
];

const team = [
	{
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1735313853/z-commerce/My_cartoon_pic_ql9ntw.jpg",
		name: "Ikedigwe Ebube",
		role: "Founder & CEO",
	},
	{
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1735313853/z-commerce/My_cartoon_pic_ql9ntw.jpg",
		name: "Ikedigwe Ebube",
		role: "Head of Operations",
	},
	{
		image: "https://res.cloudinary.com/djvestif4/image/upload/v1735313853/z-commerce/My_cartoon_pic_ql9ntw.jpg",
		name: "Ikedigwe Ebube",
		role: "Lead Developer",
	},
];
const stats = [
	{ label: "Happy Customers", number: "10K+" },
	{ label: "Products", number: "5K+" },
	{ label: "Brands", number: "50+" },
	{ label: "Support", number: "24/7" },
];

const [CoreValuesList] = getElementList();
const [TeamList] = getElementList();
const [StatsList] = getElementList();

function AboutPage() {
	return (
		<m.main
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto flex flex-col gap-[60px] px-[30px] py-16 md:py-[60px]"
		>
			{/* Hero Section */}
			<section className="text-center">
				<h1 className="mb-4 text-[3.2rem] font-bold md:text-[4rem]">About DigitalGenie</h1>

				<p className="mx-auto max-w-2xl text-[1.6rem] text-default-500">
					Your trusted destination for quality products and exceptional shopping experiences.
				</p>
			</section>

			{/* Mission Section */}
			<m.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
			>
				<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
					<div className="space-y-6">
						<h2 className="text-[2.4rem] font-bold">Our Mission</h2>

						<p className="text-[1.6rem] text-default-500">
							At DigitalGenie, {`we're`} on a mission to revolutionize online shopping by providing
							a seamless, secure, and enjoyable experience for our customers. We believe in quality,
							affordability, and exceptional service.
						</p>

						<Button
							size="lg"
							className="hover:bg-primary/90 bg-primary px-8 py-4 text-[1.4rem] font-medium
								text-white"
						>
							Learn More
						</Button>
					</div>

					<div className="h-[400px] overflow-hidden rounded-2xl">
						<ImageComponent
							src="https://res.cloudinary.com/djvestif4/image/upload/v1700101265/z-commerce/yellow-cart-bg.webp"
							alt="Our Mission"
							className="size-full object-cover"
						/>
					</div>
				</div>
			</m.section>

			{/* Values Section */}
			<m.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="flex flex-col gap-[3rem]"
			>
				<h2 className="text-center text-[2.4rem] font-bold">Our Core Values</h2>

				<CoreValuesList
					className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
					each={coreValues}
					render={(value) => (
						<m.li
							key={value.title}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="flex flex-col items-center rounded-2xl bg-content2/50 p-8 text-center"
						>
							<IconBox
								icon={value.icon}
								className="mb-4 text-4xl text-primary dark:text-secondary"
							/>

							<h3 className="mb-2 text-[1.8rem] font-semibold">{value.title}</h3>

							<p className="text-[1.6rem] text-default-500">{value.description}</p>
						</m.li>
					)}
				/>
			</m.section>

			{/* Team Section */}
			<m.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="flex flex-col gap-[3rem]"
			>
				<h2 className="text-center text-[2.4rem] font-bold">Our Team</h2>

				<TeamList
					className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
					each={team}
					render={(member) => (
						<m.li
							key={member.role}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="flex flex-col items-center rounded-2xl bg-content2/50 p-8 text-center"
						>
							<div className="mb-4 size-32 overflow-hidden rounded-full">
								<ImageComponent
									src={member.image}
									alt={member.name}
									className="size-full object-cover"
								/>
							</div>

							<h3 className="mb-2 text-[1.8rem] font-semibold text-primary dark:text-secondary">
								{member.name}
							</h3>

							<p className="text-[1.6rem] text-default-500">{member.role}</p>
						</m.li>
					)}
				/>
			</m.section>

			{/* Stats Section */}
			<m.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}
				className="flex flex-col gap-[3rem]"
			>
				<h2 className="text-center text-[2.4rem] font-bold">Stats</h2>

				<StatsList
					className="grid gap-8 rounded-2xl bg-content2/50 p-12 text-center sm:grid-cols-2
						lg:grid-cols-4"
					each={stats}
					render={(stat) => (
						<li key={stat.label}>
							<p className="mb-2 text-[2.4rem] font-bold text-primary dark:text-secondary">
								{stat.number}
							</p>
							<p className="text-[1.6rem] text-default-500">{stat.label}</p>
						</li>
					)}
				/>
			</m.section>
		</m.main>
	);
}

export default AboutPage;
