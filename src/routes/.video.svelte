<script lang="ts" context="module">
	const equals = (a: DetectedBarcode[], b: DetectedBarcode[]) =>
		a.length === b.length && a.every((item, id) => item.rawValue === b[id].rawValue)
</script>

<script lang="ts">
	import { browser } from '$app/env'
	import type { BarcodesDetectedEvent, DetectedBarcode } from '$lib/types'
	import { createEventDispatcher, onMount } from 'svelte'

	export let videoElement: HTMLVideoElement
	let errorMessage: string
	const dispatch = createEventDispatcher<{
		barcodesDetected: BarcodesDetectedEvent
		videoReady: null
	}>()

	onMount(() => {
		if (browser) processBarcode()
	})

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	export let processBarcode = async () => {
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
				let barcodes: DetectedBarcode[] = []
				do {
					const firstAttempt = await barcodeDetector.detect(videoElement)
					attempt++
					await sleep(50)
					if (firstAttempt.length) {
						const secondAttempt = await barcodeDetector.detect(videoElement)
						if (equals(firstAttempt, secondAttempt)) {
							barcodes = firstAttempt
						} else
							console.warn(
								'False alarm',
								firstAttempt.map((barcode) => barcode.rawValue),
								secondAttempt
							)
					}
					attempt > 500 && (await sleep(500))
				} while (!barcodes.length)
				videoElement.pause()
				stream.getVideoTracks().forEach((track) => track.stop())
				dispatch('barcodesDetected', barcodes)
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
		border: 1px solid orange;
	}
</style>
