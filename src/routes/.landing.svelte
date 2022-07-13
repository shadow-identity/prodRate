<script lang="ts">
	import { browser } from '$app/env'
	import { CONSENT_ID } from '$lib/constants'
	import Button from '@smui/button'
	import Paper, { Title, Subtitle, Content } from '@smui/paper'
	import { Label } from '@smui/common'
	import { set } from 'idb-keyval'
	if (browser) document.title = 'Your Personal Product Rating'
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
				I - more than once, and every time it's frustrating. In order not to fall into this trap, I
				created this service. If you did not like (or like) the purchased product, just scan its
				code and rate it. When you scan this barcode again, you will see your previous grade.
			</p>
			<p>
				For quick access to the service from the home screen, you can use the install function
				(depending on your browser).
			</p>
			<p>
				This service stores all your data exclusively on your device. Unfortunately, this means that
				data security is also your responsibility. I plan to make backup convenient. The service
				uses your device's camera to scan barcodes. By continuing to use, you agree to this.
			</p>
			<p>
				For questions and suggestions, please write to me at pavel.nedr@gmail.com or on
				<a href="https://github.com/shadow-identity/prodRate">Github</a>.
			</p>
			<Button
				variant="raised"
				on:click={() => {
					browser && set(CONSENT_ID, true)
				}}
			>
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
