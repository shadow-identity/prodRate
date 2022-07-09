export type Coords = { x: number; y: number }
export type Preference = boolean | undefined
export type DetectedBarcode = {
	boundingBox: DOMRectReadOnly
	cornerPoints: [Coords, Coords, Coords, Coords]
	format: string
	rawValue: string
}

export type Barcode = DetectedBarcode & { preference: Preference, selected: boolean }

