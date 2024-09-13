import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
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
});
