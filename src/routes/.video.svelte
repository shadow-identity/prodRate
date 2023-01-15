<script lang="ts">
	import { browser, dev } from '$app/environment'
	import type { Barcode, DetectedBarcode } from '$lib/types'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'
	import { barcodes, errorStore } from '$lib/stores'

	export let videoElement: HTMLVideoElement | undefined = undefined
	let stream: MediaStream
	let initialized = false
	let barcodeDetector: BarcodeDetector

	const dispatch = createEventDispatcher<{
		barcodesDetected: Barcode[]
		videoReady: null
	}>()

	const equals = (a: DetectedBarcode[], b: DetectedBarcode[]) =>
		a.length === b.length && a.every((item, id) => item.rawValue === b[id].rawValue)

	const init = async (isRetry: boolean = false) => {
		if (!videoElement) {
			if (isRetry) {
				$errorStore = {
					description: 'Error during initialization: videoELement is not ready',
					errorObject: new Error(),
				}
			} else {
				window.requestAnimationFrame(() => init(true))
			}
			return
		}
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' },
				audio: false,
			})
		} catch (error: any) {
			let description = ''
			if (error?.name === 'NotFoundError') {
				description =
					"Your device doesn't have a camera or the camera is not supported by your browser."
			} else if (error.message.includes('Permission')) {
				description = 'Permission to use a camera is required to scan a barcode.'
			}

			$errorStore = {
				description,
				errorObject: error.stack ? error : new Error(error),
			}
			throw error
		}
		try {
			;(window as any)['BarcodeDetector'].getSupportedFormats()
		} catch {
			;(window as any)['BarcodeDetector'] = (
				await import('@undecaf/barcode-detector-polyfill')
			).BarcodeDetectorPolyfill
		}
		barcodeDetector = new BarcodeDetector()

		try {
			videoElement.onloadeddata = () => dispatch('videoReady')
			videoElement.srcObject = stream
			await videoElement.play()
		} catch (error: any) {
			$errorStore = {
				description:
					'Error during initialization: assignment a stream to a video element is falied.',
				errorObject: error.stack ? error : new Error(error),
			}
		}
		if (!stream.active) {
			$errorStore = {
				description: 'Error during initialization: video stream is not active.',
				errorObject: new Error(),
			}
		}
		initialized = true
		refreshBarcodes()
	}

	const cleanup = () => {
		if (!initialized) {
			return
		}
		stream?.getVideoTracks().forEach((track) => track.stop())
		initialized = false
	}

	onMount(async () => {
		if (browser) {
			document.addEventListener('visibilitychange', handleVisibilityChange)
			init()
		}
	})

	onDestroy(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange)
		cleanup()
	})

	const handleVisibilityChange = () => {
		document.visibilityState === 'visible' ? init() : cleanup()
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

	export let refreshBarcodes = async () => {
		barcodes.reset()
		try {
			let detectedBarcodes: DetectedBarcode[] = []

			do {
				const firstAttempt = (await barcodeDetector.detect(videoElement)) as DetectedBarcode[]
				await sleep(dev ? 500 : 50)
				if (firstAttempt.length) {
					videoElement?.pause()
					const secondAttempt = (await barcodeDetector.detect(videoElement)) as DetectedBarcode[]
					if (equals(firstAttempt, secondAttempt)) {
						detectedBarcodes = secondAttempt
					} else {
						videoElement?.play()
					}
				}
			} while (document.visibilityState === 'visible' && !detectedBarcodes.length && initialized)

			$barcodes = detectedBarcodes as Barcode[]
		} catch (error: any) {
			$errorStore = {
				description: 'Barcode detection error.',
				errorObject: error.stack ? error : new Error(error),
			}
			throw error
		} finally {
			cleanup()
		}
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video id="videoElement" bind:this={videoElement}>
	Your browser doesn't support Barcode Detector
</video>

<style>
	#videoElement {
		object-fit: contain;
		object-position: left top;
		width: 100%;
		height: 100%;
	}
	@media (orientation: landscape) {
		#videoElement {
			object-position: left center;
		}
	}
</style>
