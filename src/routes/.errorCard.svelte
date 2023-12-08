<script lang="ts">
	import { errorStore } from '$lib/stores'
	import { EMAIL } from '$lib/constants'

	const errorMessage = $errorStore.description ?? ''
	const errorStack = $errorStore.errorObject?.stack ?? ''

	const subject = 'prodRate%20Error%20report'
	const body = encodeURI(`${navigator.userAgent}\n${errorStack}`)
	const link = `mailto:${EMAIL}?subject=${subject}&body=${body}`
</script>

{#if $errorStore.description || $errorStore.errorObject}
	<div class="card-container">
		<div style="padding: 1rem;">
			<h2 class="mdc-typography--headline6">
				{errorMessage ? 'Error occured' : 'Unknown error occured.'}
			</h2>
		</div>
		<article>
			{#if errorMessage}
				<p>
					{errorMessage}
				</p>
			{/if}
			<p>
				Please try to reload the page or send an automatically generated bug report to the
				developer.
			</p>
			<p>
				You can view and edit suggested report or send it as is. By default the report contains your
				browser and operation system version.
			</p>
		</article>
		<section>
			<button on:click={() => window.open(link)}> Send Report </button>
			<button on:click={() => location.reload()}> Reload </button>
		</section>
	</div>
{/if}

<style>
	p {
		margin-bottom: 1em;
	}
</style>
