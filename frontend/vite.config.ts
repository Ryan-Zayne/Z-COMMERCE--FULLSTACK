import { monicon } from "@monicon/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

const icons = [
	"basil:caret-down-outline",
	"bi:chevron-double-right",
	"bi:chevron-right",
	"bi:chevron-up",
	"material-symbols:check-rounded",
	"bi:facebook",
	"bi:instagram",
	"bi:menu-button-fill",
	"bi:moon-stars-fill",
	"bi:pinterest",
	"bi:twitter",
	"ant-design:heart-filled",
	"bi:youtube",
	"bx:cart-alt",
	"bx:heart",
	"bx:search-alt-2",
	"bx:user",
	"fa:facebook",
	"fa:google",
	"fa6-brands:google",
	"fa6-solid:chevron-down",
	"fa6-solid:sun",
	"material-symbols:mail-rounded",
	"material-symbols:mark-email-unread-rounded",
	"material-symbols:error-rounded",
	"ant-design:star-filled",
	"mdi:cart",
	"ant-design:heart-outlined",
	"mdi:cart-outline",
	"mdi:email",
	"mdi:map-marker",
	"mdi:minus-circle",
	"mdi:phone",
	"mdi:plus-circle",
	"radix-icons:paper-plane",
	"ri:close-fill",
	"ri:menu-3-fill",
	"tabler:trash-filled",
	"typcn:arrow-back",
];

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		viteTsconfigPaths(),
		monicon({
			icons,
			typesFileName: "types",
		}),
	],

	server: {
		proxy: {
			"/api": {
				changeOrigin: true,
				target: "http://localhost:8000",
			},
		},
	},
});
