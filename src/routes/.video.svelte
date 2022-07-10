<script lang="ts" context="module">
	const equals = (a: DetectedBarcode[], b: DetectedBarcode[]) =>
		a.length === b.length && a.every((item, id) => item.rawValue === b[id].rawValue)
</script>

<script lang="ts">
	import { browser, dev } from '$app/env'
	import type { Barcode, DetectedBarcode } from '$lib/types'
	import { createEventDispatcher, onMount } from 'svelte'
	import { barcodes } from '$lib/stores'

	export let videoElement: HTMLVideoElement | undefined = undefined

	let errorMessage: string
	const dispatch = createEventDispatcher<{
		barcodesDetected: Barcode[]
		videoReady: null
	}>()

	onMount(() => {
		if (browser) refreshBarcodes()
	})

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
			videoElement.srcObject = stream
			await videoElement.play()

			try {
				const barcodeDetector = new BarcodeDetector()
				let attempt = 0
				let detectedBarcodes: DetectedBarcode[] = []
				do {
					const firstAttempt = await barcodeDetector.detect(videoElement)
					attempt++
					await sleep(dev ? 500 : 50)
					if (firstAttempt.length) {
						const secondAttempt = await barcodeDetector.detect(videoElement)
						if (equals(firstAttempt, secondAttempt)) detectedBarcodes = firstAttempt
					}
					attempt > 500 && (await sleep(500))
				} while (!detectedBarcodes.length)
				videoElement.pause()
				stream.getVideoTracks().forEach((track) => track.stop())
				console.log('detected', detectedBarcodes.length)
				$barcodes = detectedBarcodes as Barcode[]
			} catch (error) {
				errorMessage = "Your browser doesn't support Barcode Detector"
				console.error(error)
				stream.getVideoTracks().forEach((track) => track.stop())
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
