<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import {
		Header,
		HeaderUtilities,
		HeaderActionLink,
		Content,
		SkipToContent
	} from 'carbon-components-svelte';
	import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
	import PhoneOutgoing from 'carbon-icons-svelte/lib/PhoneOutgoing.svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
</script>

<div class="app">
	<Header platformName="違停簡訊報案助手">
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
			<HeaderActionLink href="/" icon={PhoneOutgoing} />
			<HeaderActionLink href="/options" icon={SettingsAdjust} />
			<HeaderActionLink href="/about" icon={Information} />
		</HeaderUtilities>
	</Header>

	<Content style="padding: 0">
		<main>
			<slot />
		</main>
	</Content>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
