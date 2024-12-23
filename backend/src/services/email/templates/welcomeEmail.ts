import { RootLayout } from "./layouts/root";
import type { WelcomeEmailData } from "./types";

const welcomeEmail = (data: WelcomeEmailData) => {
	return RootLayout`
		<div
			style="
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 2.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    "
		>
			<h1
				style="
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 2rem;
        text-align: center;
        background: linear-gradient(to right, #4F46E5, #818CF8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      "
			>
				Welcome to DigitalGenie! ✨
			</h1>

			<p
				style="
        font-size: 1.125rem;
        line-height: 1.6;
        margin: 1.5rem 0;
        color: #e5e5e5;
      "
			>
				Hey ${data.name},
			</p>

			<p
				style="
        font-size: 1.125rem;
        line-height: 1.6;
        margin: 1.5rem 0;
        color: #e5e5e5;
      "
			>
				Thanks for choosing DigitalGenie! We're here to make your wishes for amazing products come
				true. Let's start by verifying your email address so you can explore everything we have in
				store.
			</p>

			<div
				style="
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        padding: 2rem;
        margin: 2.5rem 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
      "
			>
				<h2
					style="
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1.5rem;
          color: #ffffff;
          text-align: center;
        "
				>
					Your Wishes Await ✨
				</h2>

				<ul
					style="
          list-style-type: none;
          padding: 0;
          margin: 0;
          text-align: center;
        "
				>
					<li
						style="
            font-size: 1.125rem;
            line-height: 2;
            color: #e5e5e5;
            margin: 0.75rem 0;
          "
					>
						✨ Verify your email
					</li>
					<li
						style="
            font-size: 1.125rem;
            line-height: 2;
            color: #e5e5e5;
            margin: 0.75rem 0;
          "
					>
						🎯 Personalize your wishlist
					</li>
					<li
						style="
            font-size: 1.125rem;
            line-height: 2;
            color: #e5e5e5;
            margin: 0.75rem 0;
          "
					>
						🔍 Discover our curated collections
					</li>
					<li
						style="
            font-size: 1.125rem;
            line-height: 2;
            color: #e5e5e5;
            margin: 0.75rem 0;
          "
					>
						⭐ Make your first wish come true
					</li>
				</ul>
			</div>

			<div style="text-align: center; margin: 2.5rem 0;">
				<a
					href="${data.verificationLink}"
					style="
             display: inline-block;
             background: linear-gradient(to right, #4F46E5, #818CF8);
             color: #ffffff;
             padding: 1rem 2.5rem;
             border-radius: 0.75rem;
             font-size: 1.25rem;
             font-weight: 600;
             text-decoration: none;
             text-transform: uppercase;
             letter-spacing: 0.05em;
             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
             transition: all 0.3s ease;
           "
				>
					Grant Access ✨
				</a>
			</div>

			<p
				style="
        font-size: 1rem;
        color: #a3a3a3;
        text-align: center;
        margin: 2rem 0;
      "
			>
				Or copy this link to your browser:<br />
				<span
					style="
          color: #818CF8;
          word-break: break-all;
          display: inline-block;
          margin-top: 0.5rem;
        "
					>${data.verificationLink}</span
				>
			</p>

			<div
				style="
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        color: #a3a3a3;
      "
			>
				<p style="margin: 1rem 0;">This link works its magic for 24 hours.</p>
				<p style="margin: 1rem 0;">
					Didn't sign up for DigitalGenie?<br />
					No worries - just ignore this email.
				</p>
				<p
					style="
          font-size: 0.875rem;
          margin: 2rem 0;
          color: #e5e5e5;
        "
				>
					DigitalGenie - Where wishes meet reality ✨<br />
					Need help? Our genies are here for you.
				</p>

				<div
					style="
          font-size: 0.875rem;
          color: #a3a3a3;
          margin-top: 2rem;
        "
				>
					<p style="margin: 0.5rem 0;">
						Sent to <span style="color: #818CF8;">${data.email}</span>
						for your DigitalGenie wishlist
					</p>
					<p style="margin: 0.5rem 0;">© ${new Date().getFullYear()} DigitalGenie</p>
				</div>
			</div>
		</div>
	`;
};

export { welcomeEmail };
