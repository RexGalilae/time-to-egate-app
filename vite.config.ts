import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [react(), svgr()],
	base: '/time-to-egate-app/',
	build: {
		rollupOptions: {
			// external: ['dayjs'],
		},
	},
	assetsInclude: ['**/*.json'], // Optional: Include JSON files in the assets
	css: {
		modules: {
			localsConvention: 'camelCase', // Optional: Use camelCase for class names
		},
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/styles/variables.scss";`, // Optional: Automatically import variables, mixins, etc.
			},
		},
	},
	json: {
		stringify: true, // Ensure JSON files are correctly parsed
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
	},
});
