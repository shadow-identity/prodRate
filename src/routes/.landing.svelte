<script lang="ts">
	import { browser } from '$app/env'
	import { CONSENT_ID } from '$lib/constants'
	import Button from '@smui/button'
	import Paper, { Title, Subtitle, Content } from '@smui/paper'
	import { Label } from '@smui/common'
	import { set } from 'idb-keyval'
	import { createEventDispatcher } from 'svelte'

	if (browser) document.title = 'Your Personal Product Rating'

	const apply = () => {
		browser && set(CONSENT_ID, true)
		dispatch('gotConsent')
	}
	const dispatch = createEventDispatcher<{ gotConsent: undefined }>()
</script>

<div class="container">
	<Paper class="landing-paper">
		<Title>Your Personal Product Rating</Title>
		<Subtitle>
			Have you ever purchased the wrong product just because you forgot it didn't work for you the
			last time?
		</Subtitle>
		<Content>
			<p>
				I - more than once, and every time it's frustrating. This service helps you not to fall into
				this trap. If you don't like (or like) the purchased product, just scan its barcode and rate
				it. When you scan this barcode again, you will see your previous rate.
			</p>
			<p>
				This service stores all your data exclusively on your device. You can download and (or)
				share your data to not loose it. The service uses camera to scan barcodes. By continuing to
				use, you agree to this.
			</p>
			<p>
				For questions and suggestions, please write to me at
				<a href="mailto:pavel.nedr@gmail.com">pavel.nedr@gmail.com</a>
				or on
				<a href="https://github.com/shadow-identity/prodRate">Github</a>
				.
			</p>
			<Button variant="raised" on:click={apply}>
				<Label>Continue</Label>
			</Button>
		</Content>
	</Paper>
</div>

<style>
	:global(.landing-paper) {
		margin: 2rem;
		max-width: 50rem;
		text-align: center;
	}

	.container {
		display: flex;
		justify-content: center;
	}
	p {
		margin: 1em 0 2em;
		text-align: left;
	}
</style>
