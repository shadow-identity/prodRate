<script lang="ts">
	import type { Barcode, Coords, DetectedBarcode } from '$lib/types'
	import { barcodes } from '$lib/stores'
	import { browser } from '$app/env'

	export let width: number
	export let height: number
	export let canvasElement: HTMLCanvasElement | undefined = undefined

	const strokeAndFillBarcode = (ctx: CanvasRenderingContext2D, shape: Path2D, barcode: Barcode) => {
		const SWEETY = `30, 255, 0`
		const SHITTY = `163, 90, 7`
		if (barcode.preference === true) {
			ctx.fillStyle = `rgba(${SWEETY}, 0.2)`
			ctx.strokeStyle = `rgb(${SWEETY})`
		} else if (barcode.preference === false) {
			ctx.fillStyle = `rgba(${SHITTY}, 0.4)`
			ctx.strokeStyle = `rgb(${SHITTY})`
		} else {
			const { x, y } = getCenter(barcode.cornerPoints)
			const shittyGradient = ctx.createRadialGradient(x, y, 10, x, y, 100)
			const shittyLinearGradient = ctx.createLinearGradient(
				barcode.boundingBox.left,
				barcode.boundingBox.top,
				barcode.boundingBox.right,
				barcode.boundingBox.bottom
			)

			shittyGradient.addColorStop(0, `rgba(${SWEETY}, 0.2)`)
			shittyGradient.addColorStop(0.5, `rgba(${SHITTY}, 0.4)`)

			const width = barcode.boundingBox.width
			const step = barcode.boundingBox.width / 10
			for (let stop = 0; stop < width; stop = stop + step) {
				shittyLinearGradient.addColorStop(stop / width, `rgb(${SWEETY})`)
				const secondStop = (stop + step / 2) / width
				shittyLinearGradient.addColorStop(secondStop <= 1 ? secondStop : 1, `rgb(${SHITTY})`)
			}

			ctx.strokeStyle = shittyLinearGradient
			ctx.lineWidth = 2
			ctx.fillStyle = shittyGradient
		}
		ctx.stroke(shape)
		ctx.fill(shape)
	}

	const getCenter = (cornerPoints: DetectedBarcode['cornerPoints']): Coords =>
		cornerPoints.reduce(
			(center, corner) => ({ x: center.x + corner.x / 4, y: center.y + corner.y / 4 }),
			{ x: 0, y: 0 }
		)

	$: {
		const ctx = canvasElement?.getContext('2d')
		if (ctx && $barcodes.length) {
			ctx.clearRect(0, 0, width, height)
			$barcodes.forEach((barcode) => {
				const detectedShape = new Path2D()
				ctx.lineWidth = 2
				detectedShape.moveTo(barcode.cornerPoints[0].x, barcode.cornerPoints[0].y)
				barcode.cornerPoints.forEach((corner) => detectedShape.lineTo(corner.x, corner.y))
				detectedShape.closePath()

				strokeAndFillBarcode(ctx, detectedShape, barcode)

				if ($barcodes.length > 1) {
					canvasElement?.addEventListener('click', (event) => {
						if (ctx.isPointInPath(detectedShape, event.offsetX, event.offsetY)) {
							ctx.fillStyle = `rgba(30, 255, 0, 0.2)`
							barcodes.select(barcode)
						} else {
							ctx.fillStyle = 'transparent'
							barcodes.select(undefined)
						}
					})
				}
			})
		}
	}
</script>

<canvas id="canvasElement" {width} {height} bind:this={canvasElement} />

<style>
	#canvasElement {
		position: absolute;
		left: 0;
		border: 1px solid red;
	}
</style>
