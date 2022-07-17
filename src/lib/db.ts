import { entries, setMany } from "idb-keyval"
import { CONSENT_ID } from "./constants"

export type BarcodesDb = [string, boolean][]

export const readAllBarcodes = async (): Promise<BarcodesDb> =>
	(await entries() as BarcodesDb).filter(([key,]) => key !== CONSENT_ID)

export const writeAllBarcodes = (barcodes: BarcodesDb) => setMany(barcodes)