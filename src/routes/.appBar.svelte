<script lang="ts">
	import type { MenuComponentDev } from '@smui/menu'
	import Menu from '@smui/menu'
	import Snackbar, { Actions } from '@smui/snackbar'
	import type { SnackbarComponentDev } from '@smui/snackbar'
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
	import IconButton from '@smui/icon-button'

	import Button, { Label } from '@smui/button'
	import List, { Item, Text, Graphic } from '@smui/list'
	import { readAllBarcodes, writeAllBarcodes, type BarcodesDb } from '$lib/db'

	type Json = { description: string; timestamp: number; barcodes: BarcodesDb }

	let menu: MenuComponentDev
	let snackbarDone: SnackbarComponentDev
	let snackbarSharingError: SnackbarComponentDev
	let snackbarUploadError: SnackbarComponentDev
	let file: File | undefined
	let doneMessage = ''

	const getFile = async () => {
		const barcodes = await readAllBarcodes()
		const content: Json = {
			description: `All my saved barcodes. Open it in ${location.href}`,
			timestamp: Date.now(),
			barcodes,
		}
		const json = JSON.stringify(content, null, '  ')
		return new File([json], 'barcodes.txt', { type: 'text/plain' })
	}

	const share = async () => {
		file = await getFile()
		const files = [file]

		if (navigator.canShare({ files })) {
			try {
				await navigator.share({
					files,
					title: 'Share all barcodes',
					text: `All my saved barcodes. Open it in ${location.href}`,
				})
				file = undefined
				doneMessage = 'Shared successfully'
				snackbarDone.open()
			} catch (error) {
				console.error(error)
				snackbarSharingError.open()
			}
		}
	}
	const save = async () => {
		const a = document.createElement('a')
		a.href = window.URL.createObjectURL(file ?? (await getFile()))
		a.download = 'barcodes.txt'
		a.click()
		file = undefined
		doneMessage = 'Saved successfully'
		snackbarDone.open()
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
						doneMessage = 'Uploaded successfully'
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

<TopAppBar variant="static">
	<Row>
		<Section>
			<Title>ProdRate</Title>
		</Section>
		<Section align="end">
			<div>
				<IconButton class="material-icons" on:click={() => menu.setOpen(true)}>
					more_vert
				</IconButton>
				<Menu variant="modal" fixed={false} bind:this={menu} anchorCorner="BOTTOM_LEFT">
					<List>
						{#if !!navigator.canShare}
							<Item href="javascript:void(0)" on:SMUI:action={share}>
								<Graphic class="material-icons" aria-hidden="true">share</Graphic>
								<Text>Share all data</Text>
							</Item>
						{/if}
						<Item href="javascript:void(0)" on:SMUI:action={save}>
							<Graphic class="material-icons" aria-hidden="true">file_download</Graphic>
							<Text>Save as file</Text>
						</Item>
						<Item href="javascript:void(0)" on:SMUI:action={upload}>
							<Graphic class="material-icons" aria-hidden="true">upload_file</Graphic>
							<Text>Upload saved barcodes</Text>
						</Item>

						<!--
						<Separator />
						<Subheader component={H6}>Labels</Subheader>
						<Item href="javascript:void(0)" on:click={() => {}}>
							<Graphic class="material-icons" aria-hidden="true">feedback</Graphic>
							<Text>Feedback</Text>
						</Item>
						-->
					</List>
				</Menu>
			</div>
		</Section>
	</Row>
</TopAppBar>

<Snackbar bind:this={snackbarSharingError} variant="stacked">
	<Label>
		Something went wrong during sharing. You can save your barcodes on your device instead.
	</Label>
	<Actions>
		<Button on:click={() => save()}>Save</Button>
	</Actions>
</Snackbar>

<Snackbar bind:this={snackbarUploadError}>
	<Label>Wrong file format</Label>
	<Actions>
		<Button on:click={() => upload()}>Try again</Button>
	</Actions>
</Snackbar>

<Snackbar bind:this={snackbarDone}>
	<Label>{doneMessage}</Label>
</Snackbar>
