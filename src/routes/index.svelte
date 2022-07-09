<script lang="ts">
	import { selectedBarcode } from '$lib/stores'

	import Buttons from './.buttons.svelte'
	import Video from './.video.svelte'
	import Canvas from './.canvas.svelte'
	import { browser, dev } from '$app/env'

	if (browser) document.title = `${dev && 'DEV'} Product Rate`

	let refreshBarcodes: () => Promise<void>

	let [canvasWidth, canvasHeight] = [0, 0]

	let canvasElement: HTMLCanvasElement
	let videoElement: HTMLVideoElement

	const adjustDimensions = () => {
		const width = videoElement.clientWidth
		const height = videoElement.clientHeight
		canvasWidth = videoElement.clientWidth
		canvasHeight = videoElement.clientHeight
		canvasElement.width = width || 0
		canvasElement.height = height || 0
	}
</script>

<h1>Scan a code!</h1>
<section id="videoContainer">
	<Video bind:videoElement bind:refreshBarcodes on:videoReady={adjustDimensions} />
	<Canvas bind:canvasElement width={canvasWidth} height={canvasHeight} />
</section>

{#if $selectedBarcode && $selectedBarcode.selected}
	<Buttons on:refreshBarcodes={refreshBarcodes} />
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
