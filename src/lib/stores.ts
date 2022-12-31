import { getMany, set as setKeyval } from "idb-keyval"
import { derived, writable } from "svelte/store"

import type { Barcode, DetectedBarcode, Preference } from "./types"

export const createBarcodes = () => {
	const { subscribe, set, update, } = writable<Barcode[]>([])

	const setBarcodes = async (detectedBarcodes: DetectedBarcode[]) => {
		const preferences: Preference[] = await getMany(
			detectedBarcodes.map((detectedBarcodes) => detectedBarcodes.rawValue)
		)
		const barcodes = preferences.map((preference, id) => ({ ...detectedBarcodes[id], preference, selected: detectedBarcodes.length === 1 }))
		set(barcodes)
	}

	const select = (selectedBarcode: Barcode | undefined) =>
		update(
			store => store.map(
				barcode => {
					barcode.preference = barcode === selectedBarcode
					return barcode
				}
			)
		)

	const prefer = (selectedBarcode: Barcode, preference: Preference) => {
		update(
			store => store.map(
				barcode => {
					if (barcode === selectedBarcode) {
						barcode.preference = preference
						setKeyval(selectedBarcode.rawValue, preference)
					}
					return barcode
				}
			)
		)
	}


	return {
		subscribe,
		set: setBarcodes,
		select,
		prefer,
		reset: () => set([])
	}
}

export const barcodes = createBarcodes()

const createSelectedBarcode = () => {
	const selection = derived(barcodes, $barcodes => $barcodes.find(bc => bc.selected))
	const prefer = (preference: Preference) => {
		let selectedBarcode: Barcode | undefined
		selection.subscribe(barcode => selectedBarcode = barcode)()
		selectedBarcode && barcodes.prefer(selectedBarcode, preference)
	}

	return {
		...selection,
		prefer,
	}
}

export const selectedBarcode = createSelectedBarcode()

export const errorStore = writable<Error | undefined>()
