import { sveltekit } from '@sveltejs/kit/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		basicSsl(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
}

export default config
