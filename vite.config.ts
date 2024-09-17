import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
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
});
