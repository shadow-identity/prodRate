<script lang="ts">
	import Fab from '@smui/fab'
	import { selectedBarcode } from '$lib/stores'

	import { Icon } from '@smui/common'
	import { createEventDispatcher } from 'svelte'
	import type { Preference } from '$lib/types'

	const dispatch = createEventDispatcher<{
		refreshBarcodes: undefined
		setPreference: Preference
	}>()
</script>

<div class="container">
	<Fab
		on:click={() => selectedBarcode.prefer(false)}
		color={$selectedBarcode?.preference === false ? 'primary' : undefined}
		touch
		label="dislike"
	>
		<Icon class="material-icons">💩</Icon>
	</Fab>
	<Fab on:click={() => dispatch('refreshBarcodes')} touch label="scan again">
		<Icon class="material-icons">refresh</Icon>
	</Fab>
	<Fab
		on:click={() => selectedBarcode.prefer(true)}
		color={$selectedBarcode?.preference === true ? 'primary' : undefined}
		touch
		label="like"
	>
		<Icon class="material-icons">favorite</Icon>
	</Fab>
</div>

<style>
	.container {
		margin-top: 1rem;
		display: flex;
		justify-content: space-around;
	}
</style>
