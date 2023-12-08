<script lang="ts">
	import { readAllBarcodes, writeAllBarcodes, type BarcodesDb } from '$lib/db'

	type Json = { description: string; timestamp: number; barcodes: BarcodesDb }

	let snackbarDone = false
	let snackbarSharingError = false
	let snackbarUploadError = false
	let file: File | undefined
	let doneMessage = ''

	const getFile = async () => {
		const barcodes = await readAllBarcodes()
		const content: Json = {
			description: `All my saved barcodes. Open it in ${location.href}`,
			timestamp: Date.now(),
			barcodes
		}
		const json = JSON.stringify(content, null, '  ')
		return new File([json], 'barcodes.txt', { type: 'text/plain' })
	}

	const share = async () => {
		file = await getFile()
		const files = [file]

		if (navigator?.canShare({ files })) {
			try {
				await navigator?.share({
					files,
					title: 'Share all barcodes',
					text: `All my saved barcodes. Open it in ${location.href}`
				})
				file = undefined
				doneMessage = 'Shared successfully'
				snackbarDone = true
			} catch (error) {
				console.error(error)
				snackbarSharingError = true
			}
		}
	}
	const save = async () => {
		const a = document.createElement('a')
		a.href = window.URL.createObjectURL(file ?? (await getFile()))
		a.download = 'barcodes.txt'
		a.click()
		file = undefined
		doneMessage = 'Exported successfully'
		snackbarDone = true
	}

	const upload = async () => {
		const input = document.createElement('input')
		input.type = 'file'
		input.accept = 'text/plain, application/json'
		input.oninput = () => {
			try {
				const [file] = input.files ?? []
				const reader = new FileReader()
				if (file) {
					reader.readAsText(file)
				} else {
					throw 'Wrong file format'
				}
				reader.onload = async () => {
					try {
						const fileContent = reader.result as string
						const json: Json = JSON.parse(fileContent)
						await writeAllBarcodes(json.barcodes)
						doneMessage = 'Imported successfully'
						snackbarDone.open()
					} catch (error) {
						console.error(error)
						snackbarUploadError.open()
					}
				}
			} catch (error) {
				console.error(error)
				snackbarUploadError.open()
			}
		}
		input.click()
	}
</script>

<header>
	<h1>Barcode Monkey</h1>
	<section>
		<button on:click={() => console.error('not implemented')}>more_vert</button>
		<!-- menu content -->
		<section>
			<ul>
				{#if navigator?.canShare}
					<li>
						<!-- share -->
						<span>Share all barcodes</span>
					</li>
				{/if}
				<li>
					<!-- save, file_download -->
					<span>Export barcodes</span>
				</li>
				<li>
					<!-- upload, file_upload -->
					<span>Import saved barcodes</span>
				</li>
				<!-- separator -->
				<li>
					<!-- window.open(`mailto:${EMAIL}?subject=Feedback`) -->
					<!-- feedback icon -->
					<span>Feedback</span>
				</li>
				<li>
					<!-- help icon -->
					<a href="/about">About</a>
				</li>
			</ul>
		</section>
	</section>
</header>

<!-- popovers -->
{#if snackbarSharingError}
	Something went wrong during sharing. You can export your barcodes to a file on your device
	instead.
	<button on:click={save}>Export</button>
{/if}

{#if snackbarUploadError}
	<p>Wrong file format</p>
	<button on:click={upload}>Try again</button>
{/if}

{#if snackbarDone}
	<span>{doneMessage}</span>
{/if}
