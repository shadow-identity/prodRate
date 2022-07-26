<script lang="ts">
	import { selectedBarcode } from '$lib/stores'

	import Buttons from './.buttons.svelte'
	import Video from './.video.svelte'
	import Canvas from './.canvas.svelte'
	import AppBar from './.appBar.svelte'
	import { browser, dev } from '$app/env'

	if (browser) document.title = `${dev ? 'DEV ' : ''}Product Rate`

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

<div class="gridContainer">
	<AppBar />
	<main>
		<section id="mediaContainer">
			<Video bind:videoElement bind:refreshBarcodes on:videoReady={adjustDimensions} />
			<Canvas bind:canvasElement width={canvasWidth} height={canvasHeight} />
			{#if $selectedBarcode && $selectedBarcode.selected}
				<section id="buttons" style:top={`${$selectedBarcode.boundingBox.bottom}px`}>
					<Buttons on:refreshBarcodes={refreshBarcodes} />
				</section>
			{/if}
		</section>
	</main>
</div>

<style>
	.gridContainer {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content minmax(0, 1fr) min-content;
		grid-template-areas:
			'header'
			'media'
			'buttons';
		justify-items: center;
		align-items: start;
	}

	#mediaContainer {
		position: relative;
		grid-area: media;
		align-self: center;
	}

	#buttons {
		/* height: 100%; */
		width: 100%;
		position: absolute;
		/* grid-area: buttons;
		justify-self: stretch;
		align-self: end; */
		height: 6rem;
	}

	@media (orientation: landscape) {
		main {
			grid-template-columns: 1fr 1fr;
			/* grid-template-columns: auto minmax(15rem, 0.5fr); */
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'media header'
				'media buttons';
		}
		#mediaContainer {
			align-self: center;
		}
	}
</style>
