<script lang="ts">
	import Fab from '@smui/fab'
	import { get, set } from 'idb-keyval'
	import { Icon } from '@smui/common'
	import { createEventDispatcher } from 'svelte'
	export let id: string

	let state: boolean | undefined
	;(async () => (state = await get(id)))()
	const dispatch = createEventDispatcher()
</script>

<div class="container">
	<Fab
		on:click={() => set(id, false)}
		color={state === false ? 'primary' : undefined}
		touch
		label="dislike"
	>
		<Icon class="material-icons">💩</Icon>
	</Fab>
	<Fab on:click={() => dispatch('readBarcode')} touch label="scan again">
		<Icon class="material-icons">refresh</Icon>
	</Fab>
	<Fab
		on:click={() => set(id, true)}
		color={state === true ? 'primary' : undefined}
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
