# prodRate

Simple client-side web app designed to remind the user whether he liked the purchased product last time or not.

## Goals 
It should be compatible with screen readers.
The app is already green in Lighthouse but I want it to pass 100% of tests.
It should work at least in latest Chrome, Edge, Firefox and Safari.

## How it works
The app is based on [SvelteKit](https://kit.svelte.dev/), and I use [Svelte Material UI](https://sveltematerialui.com/) as a UI library.

The app uses MediaDevices API to capture video stream from device's camera and BarcodeDetector API to search for barcodes in the stream. 
Since the BarcodeDetector API is still experimental, this feature has a JS fallback.
Scanned barcodes are outlined and highlighted with simple canvas drawing and user is asked if he like or dislike the corresponding item.
The answer is stored in IndexedDB storage so if user scans the same barcode later, he will know his previous answer.

User can share or save all his answers, as well as upload prevously saved answers into his database.

Since the app is PWA ready, it can be installed.
