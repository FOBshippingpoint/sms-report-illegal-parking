<script lang="ts">
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import { reportData } from '$lib/report-data';
	import { Button, Modal, TextInput } from 'carbon-components-svelte';
	import { commonlyUsed } from '$lib/commonly-used';

	let open = false;
	let smsName;
	let invalidText;
	let warnText;

	function handleSave() {
		commonlyUsed.update((old) => {
			return { ...old, [smsName]: $reportData };
		});
	}

	$: if (smsName && $commonlyUsed[smsName]) {
		warnText = '已有此筆簡訊，確認後將覆蓋資料';
	} else {
		warnText = '　';
	}

	$: if (smsName === '') {
		invalidText = '簡訊代號不可為空';
	} else {
		invalidText = '';
	}

	function createDefaultName() {
		const recordLen = Object.keys($commonlyUsed).length;
		if (recordLen === 0) {
			smsName = '常用簡訊1';
		} else {
			for (let i = 1; i <= recordLen + 1; i++) {
				const name = '常用簡訊' + i;
				if (!$commonlyUsed[name]) {
					smsName = name;
					break;
				}
			}
		}
	}
</script>

<Button
	kind="secondary"
	icon={Save}
	on:click={() => {
		createDefaultName();
		open = true;
	}}>儲存至常用簡訊</Button
>

<Modal
	bind:open
	size="xs"
	modalHeading="儲存至常用簡訊"
	primaryButtonText="確定"
	primaryButtonDisabled={invalidText !== ''}
	secondaryButtonText="取消"
	selectorPrimaryFocus="#smsName"
	on:click:button--secondary={() => (open = false)}
	on:click:button--primary={() => {
		setTimeout(handleSave, 1000);
		open = false;
	}}
>
	<TextInput
		id="smsName"
		labelText="簡訊代號"
		bind:value={smsName}
		invalid={invalidText !== ''}
		{invalidText}
		warn={warnText !== '　'}
		{warnText}
	/>
</Modal>
