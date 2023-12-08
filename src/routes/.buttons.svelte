<script lang="ts">
	import { selectedBarcode } from '$lib/stores'

	import { createEventDispatcher } from 'svelte'
	import type { Preference } from '$lib/types'

	const dispatch = createEventDispatcher<{
		refreshBarcodes: undefined
		setPreference: Preference
	}>()
</script>

<div class="container">
	<button
		on:click={() => selectedBarcode.prefer(false)}
		style:background-color={$selectedBarcode?.preference === false ? 'palegreen' : undefined}
		aria-label="dislike"
	>
		💩
	</button>
	<button on:click={() => dispatch('refreshBarcodes')} aria-label="scan again"> refresh </button>
	<button
		on:click={() => selectedBarcode.prefer(true)}
		style:background-color={$selectedBarcode?.preference === true ? 'palegreen' : undefined}
		aria-label="like"
	>
		favorite
	</button>
</div>

<style>
	.container {
		margin: 1rem 0;
		display: flex;
		justify-content: space-around;
	}
</style>
