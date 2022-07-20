<script lang="ts">
	import { browser, dev } from '$app/env'
	import type { Barcode, DetectedBarcode } from '$lib/types'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'
	import { barcodes } from '$lib/stores'
	import { BarcodeDetectorPolyfill } from '$lib/barcode-detector/barcode-detector'

	export let videoElement: HTMLVideoElement | undefined = undefined
	let stream: MediaStream
	let initialized = false
	let barcodeDetector =
		'BarcodeDetector' in window ? new BarcodeDetector() : new BarcodeDetectorPolyfill()

	let errorMessage: string
	const dispatch = createEventDispatcher<{
		barcodesDetected: Barcode[]
		videoReady: null
	}>()

	const equals = (a: DetectedBarcode[], b: DetectedBarcode[]) =>
		a.length === b.length && a.every((item, id) => item.rawValue === b[id].rawValue)

	const init = async () => {
		if (!videoElement) return
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' },
				audio: false,
			})
		} catch (error: any) {
			if (error.message && error.message.includes('Permission')) {
				errorMessage = 'Permission to use a camera is required to scan a barcode.'
			}
			console.error(error)
			throw error
		}
		videoElement.onloadeddata = () => dispatch('videoReady')
		videoElement.srcObject = stream
		await videoElement.play()
		initialized = true
	}

	const cleanup = () => {
		if (!initialized) return
		stream.getVideoTracks().forEach((track) => track.stop())
		initialized = false
	}

	onMount(async () => {
		if (browser) {
			document.addEventListener('visibilitychange', handleVisibilityChange)
			refreshBarcodes()
		}
	})

	onDestroy(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange)
		cleanup()
	})

	const handleVisibilityChange = () =>
		document.visibilityState === 'visible' ? refreshBarcodes() : cleanup()

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	export let refreshBarcodes = async () => {
		if (!videoElement || document.visibilityState === 'hidden') return
		if (!initialized || stream.active) await init()
		barcodes.reset()
		try {
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
			videoElement?.pause()
			$barcodes = detectedBarcodes as Barcode[]
		} catch (error) {
			errorMessage = "Your browser doesn't support Barcode Detector"
			console.error(error)
		} finally {
			cleanup()
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
