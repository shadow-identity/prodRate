<script lang="ts">
	import { browser } from '$app/environment'
	import App from './.app.svelte'
	import Landing from './.landing.svelte'
	import { CONSENT_ID } from '$lib/constants'
	import { get } from 'idb-keyval'

	let consent: boolean | undefined = false
	browser && (async () => (consent = await get(CONSENT_ID)))()

	const gotConsent = () => (consent = true)
</script>

{#if consent === true}
	<App />
{:else if consent === undefined}
	<Landing on:gotConsent={gotConsent} />
{/if}
