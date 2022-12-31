<script lang="ts">
	import Card, { Content, Actions } from '@smui/card'
	import Button, { Label } from '@smui/button'
	import { errorStore } from '$lib/stores'
	import { EMAIL } from '$lib/constants'

	export let errorMessage = ''
	export let errorStack = $errorStore?.stack ?? ''

	const subject = 'prodRate%20Error%20report'
	const body = encodeURI(`${navigator.userAgent}\n${errorStack}`)

	const link = `mailto:${EMAIL}?subject=${subject}&body=${body}`
</script>

{#if errorMessage}
	<Card>
		<Content>
			<h3>{errorMessage}</h3>
		</Content>
		<Actions>
			<Button on:click={() => window?.location.reload()}>
				<Label>Retry</Label>
			</Button>
		</Actions>
	</Card>
{:else if $errorStore}
	<div class="card-container">
		<Card>
			<div style="padding: 1rem;">
				<h2 class="mdc-typography--headline6">Unknown error occured.</h2>
				<h3 class="mdc-typography--subtitle2">
					Please try to reload the page or send an automatically generated bug report to the
					developer.
				</h3>
			</div>
			<Content>
				You can view and edit suggested report or send it as is. By default the report contains your
				browser and operation system version.
			</Content>
			<Actions>
				<Button on:click={() => window.open(link)}>
					<Label>Send Report</Label>
				</Button>
				<Button on:click={() => location.reload()}>
					<Label>Reload</Label>
				</Button>
			</Actions>
		</Card>
	</div>
{/if}
