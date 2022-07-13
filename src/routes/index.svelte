<script lang="ts">
	import { browser } from '$app/env'
	import App from './.app.svelte'
	import Landing from './.landing.svelte'
	import { CONSENT_ID } from '$lib/constants'
	import { get } from 'idb-keyval'
</script>

{#await browser && get(CONSENT_ID) then consent}
	{#if consent}
		<App />
	{:else}
		<Landing />
	{/if}
{/await}
