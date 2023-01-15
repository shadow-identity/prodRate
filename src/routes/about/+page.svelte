<script lang="ts">
	import Card, { Content, Actions, ActionButtons } from '@smui/card'
	import Button, { Label } from '@smui/button'
	import { goto } from '$app/navigation'
</script>

<Card>
	<Content>
		<h1>Barcode Monkey</h1>
		<h3>How to use</h3>
		<ol>
			<li>Accept camera usage if asked.</li>
			<li>Point camera on a barcode of a product.</li>
			<li>
				In case of successfull code recognition, the camera image will be paused and three buttons
				will appear.
			</li>
			<li>
				If you scan the barcode for the first time, all the buttons will have the same style.
				Otherwise you'll see the like or dislike button colored depending on your previous rate.
				Barcode will be also colored.
			</li>
			<li>
				To set or update your rate you can press one of the rate buttons. To scan a next barcode
				press the Refresh button.
			</li>
		</ol>
		<h3>Links</h3>
		<ul>
			<li>
				Project home with source and issue tracker:
				<a href="https://github.com/shadow-identity/prodRate" target="_blank" rel="noreferrer">
					github
				</a>
			</li>
			<li>
				The main application address:
				<!-- svelte-ignore security-anchor-rel-noreferrer -->
				<a href="https://barcodemonkey.app" target="_blank">barcodemonkey.app</a>
			</li>
		</ul>
	</Content>
	<Actions>
		<ActionButtons>
			<Button on:click={() => goto('/')}>
				<Label>Let's scan!</Label>
			</Button>
		</ActionButtons>
	</Actions>
</Card>
