<script lang="ts" context="module">
	const equals = (a: DetectedBarcode[], b: DetectedBarcode[]) =>
		a.length === b.length && a.every((item, id) => item.rawValue === b[id].rawValue)
</script>

<script lang="ts">
	import { browser, dev } from '$app/env'
	import type { Barcode, DetectedBarcode } from '$lib/types'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'
	import { barcodes } from '$lib/stores'
	import { BarcodeDetectorPolyfill } from '$lib/barcode-detector/barcode-detector'

	export let videoElement: HTMLVideoElement | undefined = undefined

	let errorMessage: string
	const dispatch = createEventDispatcher<{
		barcodesDetected: Barcode[]
		videoReady: null
	}>()

	onMount(() => {
		if (browser) refreshBarcodes()
	})

	const getDetector = async () => {
		if ('BarcodeDetector' in window) {
			return new BarcodeDetector()
		} else {
			console.warn('ZXing BarcodeDetector')
			return new BarcodeDetectorPolyfill()
		}
	}
	const stopStream = (stream: MediaStream) =>
		stream.getVideoTracks().forEach((track) => track.stop())

	const handleVisibilityChange = (stream?: MediaStream) => {
		document.visibilityState === 'visible' ? refreshBarcodes() : stopStream(stream!)
	}
	onDestroy(
		() =>
			browser && document.removeEventListener('visibilitychange', () => handleVisibilityChange())
	)
	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	export let refreshBarcodes = async () => {
		barcodes.reset()
		if (!videoElement) return
		try {
			videoElement.onloadeddata = () => dispatch('videoReady')

			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' },
				audio: false,
			})
			document.addEventListener('visibilitychange', () => handleVisibilityChange(stream))
			videoElement.srcObject = stream
			await videoElement.play()

			try {
				const barcodeDetector = await getDetector()
				let attempt = 0
				let detectedBarcodes: DetectedBarcode[] = []
				do {
					const firstAttempt = (await barcodeDetector.detect(videoElement)) as DetectedBarcode[]
					attempt++
					await sleep(dev ? 500 : 50)
					if (firstAttempt.length) {
						const secondAttempt = (await barcodeDetector.detect(videoElement)) as DetectedBarcode[]
						if (equals(firstAttempt, secondAttempt)) detectedBarcodes = firstAttempt
					}
					attempt > 500 && (await sleep(500))
				} while (document.visibilityState === 'visible' && !detectedBarcodes.length)
				videoElement.pause()
				stopStream(stream)
				$barcodes = detectedBarcodes as Barcode[]
			} catch (error) {
				errorMessage = "Your browser doesn't support Barcode Detector"
				console.error(error)
				stopStream(stream)
			}
		} catch (error: any) {
			if (error.message && error.message.includes('Permission')) {
				errorMessage = 'Permission to use a camera is required to scan a barcode.'
			}
			console.error(error)
		}
	}
</script>

{#if errorMessage}
	<strong>
		{errorMessage}
	</strong>
{:else}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="videoElement" bind:this={videoElement}>
		Your browser doesn't support Barcode Detector
	</video>
{/if}

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
