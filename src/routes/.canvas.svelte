<script lang="ts">
	import type { Barcode, DetectedBarcode } from '$lib/types'

	export let barcodes: Barcode[]
	export let width: string
	export let height: string
	export let canvasElement: HTMLCanvasElement
	export let selectedBarcodeId: string

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

	const drawCanvas = () => {
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
			if (selectedBarcodeId) {
				handleChoose(ctx, detectedShape, barcode.preference, barcode.cornerPoints) // todo: pass full barcode object
			} else {
				canvasElement.addEventListener('click', (event) => {
					if (ctx.isPointInPath(detectedShape, event.offsetX, event.offsetY)) {
						ctx.fillStyle = `rgba(30, 255, 0, 0.2)`
						selectedBarcodeId = barcode.rawValue
					} else {
						ctx.fillStyle = 'transparent'
						selectedBarcodeId = ''
					}
					ctx.stroke(detectedShape)
					ctx.fill(detectedShape)
				})
			}
		})
	}
	canvasElement && drawCanvas()
</script>

<canvas id="canvasElement" {width} {height} bind:this={canvasElement} />

<style>
	#canvasElement {
		position: absolute;
		left: 0;
		border: 1px solid red;
	}
</style>
