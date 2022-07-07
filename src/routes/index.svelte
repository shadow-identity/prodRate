<script lang="ts">
	import type { Barcode, BarcodesDetectedEvent, DetectedBarcode, Preference } from '$lib/types'
	import { getMany } from 'idb-keyval'

	import Buttons from './.buttons.svelte'
	import Video from './.video.svelte'
	import Canvas from './.canvas.svelte'

	let selectedBarcodeId: string
	let [videoWidth, videoHeight] = ['100vw', '70vh']

	let canvasElement: HTMLCanvasElement
	let videoElement: HTMLVideoElement
	let barcodes: Barcode[] = []
	let processBarcode: () => Promise<void>

	const handleBarcodesDetected = async ({
		detail: detectedBarcodes,
	}: CustomEvent<BarcodesDetectedEvent>) => {
		if (detectedBarcodes.length === 1) {
			selectedBarcodeId = detectedBarcodes[0].rawValue
		}
		const preferences: Preference[] = await getMany(
			detectedBarcodes.map((detectedBarcodes) => detectedBarcodes.rawValue)
		)
		barcodes = preferences.map((preference, id) => ({ ...detectedBarcodes[id], preference }))
	}

	const adjustDimensions = () => {
		const width = videoElement.clientWidth
		const height = videoElement.clientHeight
		const widthPx = `${width || 0}px`
		const heigthPx = `${height || 0}px`
		videoWidth = widthPx
		videoHeight = heigthPx
		canvasElement.width = width || 0
		canvasElement.height = height || 0
	}
</script>

<h1>Scan a code!</h1>
<section id="videoContainer">
	<Video
		bind:videoElement
		bind:processBarcode
		on:barcodesDetected={handleBarcodesDetected}
		on:videoReady={adjustDimensions}
	/>
	<Canvas
		bind:canvasElement
		{barcodes}
		width={videoWidth}
		height={videoHeight}
		bind:selectedBarcodeId
	/>
</section>
{#if selectedBarcodeId}
	<Buttons id={selectedBarcodeId} on:readBarcode={processBarcode} />
{/if}

<style>
	h1 {
		text-align: center;

		line-height: 2em;
	}
	#videoContainer {
		position: relative;
	}
</style>
