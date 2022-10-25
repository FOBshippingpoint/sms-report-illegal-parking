<script lang="ts">
	import { TextArea } from 'carbon-components-svelte';
	import { reportData } from '$lib/report-data';
	//  import { smsText } from '$lib/sms-text';

	let value = '';
	export let smsText;
	//  let loadTimes = 0

	function generateSMSText(data) {
		let text = '';
		text += `地點：${data.address}`;
		text += `\n違規情事：有${data.vehicles}在${data.situation}`;
		if (data.plateNumbers) {
			text += `\n車牌號碼：${data.plateNumbers}`;
		}
		if (data.imageURLs) {
			text += `\n照片連結：${data.imageURLs}`;
		}
		text += '\n請派員處理';
		if (data.signature) {
			text += `\n\n${data.signature}`;
		}

		return text;
	}

	reportData.subscribe((val) => {
		value = generateSMSText(val);
	});

	$: smsText = value;

	//  smsText.subscribe((val) => {
	//    value = val
	//  })
	//
	//  $: smsText.set(value)
	//
	//  reportData.subscribe((val) => {
	//    console.log('hello')
	//    if (loadTimes < Object.keys($reportData).length - 2) {
	//      loadTimes++
	//      return
	//    } else {
	//      smsText.set(generateSMSText(val))
	//    }
	//    smsText.set(generateSMSText(val))
	//  })
</script>

<TextArea rows={6} labelText="簡訊" placeholder="..." bind:value />
