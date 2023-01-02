// Modified copy of https://github.com/xulihang/barcode-detector-polyfill (building was not working with the original package)
import BarcodeDetectorZXing from './BarcodeDetectorZXing'
import type { BarcodeDetectorOptions, BarcodeFormat, DetectedBarcode } from './Definitions'

export * from './BarcodeDetectorZXing'
export * from './Definitions'

export default class BarcodeDetector {
	private reader: BarcodeDetectorZXing
	constructor(barcodeDetectorOptions?: BarcodeDetectorOptions) {
		this.reader = new BarcodeDetectorZXing(barcodeDetectorOptions)
	}

	static async getSupportedFormats(): Promise<BarcodeFormat[]> {
		return BarcodeDetectorZXing.getSupportedFormats()
	}

	async detect(image: ImageBitmapSource): Promise<DetectedBarcode[]> {
		return await this.reader.detect(image)
	}
}

export { BarcodeDetector as BarcodeDetectorPolyfill }