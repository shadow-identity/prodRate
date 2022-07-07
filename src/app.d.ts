/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare class BarcodeDetector {
	detect: (imageBitmapSource: HTMLVideoElement) => Promise<import('$lib/types').DetectedBarcode[]>
	getSupportedFormats: () => Promise<string[]>
}