<script lang="ts">
	import { browser } from '$app/env'
	import { get, set } from 'idb-keyval'

	import { onMount } from 'svelte'
	import Buttons from './_buttons.svelte'

	type Coords = { x: number; y: number }
	type DetectedBarcode = {
		boundingBox: DOMRectReadOnly
		cornerPoints: [Coords, Coords, Coords, Coords]
		format: string
		rawValue: string
	}

	let errorMessage: string
	let choosenId: string
	let preference: boolean | undefined
	let [videoWidth, videoHeight] = ['100vw', '70vh']
	let canvasElement: HTMLCanvasElement
	let videoElement: HTMLVideoElement
	let videoContainerElement: HTMLElement

	onMount(() => {
		if (browser) processBarcode()
		adjustDimensions()
	})

	const adjustDimensions = () => {
		const width = videoElement.clientWidth
		const height = videoElement.clientHeight
		const widthPx = `${width || 0}px`
		const heigthPx = `${height || 0}px`
		// videoContainerElement.style.width = widthPx
		// videoContainerElement.style.height = heigthPx
		videoWidth = widthPx
		videoHeight = heigthPx
		canvasElement.width = width || 0
		canvasElement.height = height || 0
		console.log('onMount', videoWidth, videoHeight)
	}

	const handleChoose = (
		ctx: CanvasRenderingContext2D,
		shape: Path2D,
		preference: boolean | undefined,
		cornerPoints: DetectedBarcode['cornerPoints']
	) => {
		if (preference === true) ctx.fillStyle = `rgba(30, 255, 0, 0.2)`
		else if (preference === false) ctx.fillStyle = `rgba(163, 90, 7, 0.4)`
		else {
			const [centerX, centerY] = getCenter(cornerPoints)
			const shittyGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 100)

			shittyGradient.addColorStop(0, `rgba(30, 255, 0, 0.2)`)
			shittyGradient.addColorStop(0.5, `rgba(163, 90, 7, 0.4)`)

			ctx.stroke(shape)
			ctx.fillStyle = shittyGradient
			ctx.fill(shape)
		}
		ctx.fill(shape)
	}

	const getCenter = (cornerPoints: DetectedBarcode['cornerPoints']): [number, number] =>
		cornerPoints.reduce(
			(center, corner) => [center[0] + corner.x / 4, center[1] + corner.y / 4],
			[0, 0]
		)

	const drawCanvas = (barcodes: DetectedBarcode[]) => {
		const ctx = canvasElement.getContext('2d')
		if (!ctx) return
		ctx.strokeStyle = 'green'
		barcodes.forEach((barcode) => {
			const detectedShape = new Path2D()
			ctx.lineWidth = 2
			detectedShape.moveTo(barcode.cornerPoints[0].x, barcode.cornerPoints[0].y)
			barcode.cornerPoints.forEach((corner) => detectedShape.lineTo(corner.x, corner.y))
			detectedShape.closePath()
			ctx.stroke(detectedShape)
			choosenId && handleChoose(ctx, detectedShape, preference, barcode.cornerPoints) // todo: pass full barcode object
			!choosenId &&
				canvasElement.addEventListener('click', (event) => {
					if (ctx.isPointInPath(detectedShape, event.offsetX, event.offsetY)) {
						ctx.fillStyle = `rgba(30, 255, 0, 0.2)`
						choosenId = barcode.rawValue
					} else {
						ctx.fillStyle = 'transparent'
						choosenId = ''
					}
					ctx.stroke(detectedShape)
					ctx.fill(detectedShape)
				})
		})
	}

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
	const processBarcode = async () => {
		choosenId = ''
		preference = undefined
		try {
			videoElement.onloadeddata = adjustDimensions

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
					barcodes = await barcodeDetector.detect(videoElement)
					attempt++
					await sleep(50)
					attempt > 5000 && (await sleep(500))
				} while (!barcodes.length)
				videoElement.pause()
				stream.getVideoTracks().forEach((track) => track.stop())
				if (barcodes.length === 1) {
					choosenId = barcodes[0].rawValue
					preference = await get(choosenId)
				}
				drawCanvas(barcodes)
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

<h1>Scan a code!</h1>
{#if errorMessage}
	<strong>
		{errorMessage}
	</strong>
{:else}
	<section id="videoContainer" bind:this={videoContainerElement}>
		<!-- svelte-ignore a11y-media-has-caption -->
		<video id="videoElement" bind:this={videoElement}>
			Your browser doesn't support Barcode Detector
		</video>
		<canvas id="canvasElement" width={videoWidth} height={videoHeight} bind:this={canvasElement} />
	</section>
{/if}
{#if choosenId}
	<Buttons id={choosenId} on:readBarcode={processBarcode} />
{/if}

<style>
	h1 {
		text-align: center;

		line-height: 2em;
	}
	#videoContainer {
		position: relative;
	}
	#canvasElement {
		position: absolute;
		left: 0;
		border: 1px solid red;
	}
	#videoElement {
		object-fit: contain;
		object-position: left top;
		border: 1px solid orange;
	}
</style>
