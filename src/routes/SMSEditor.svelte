<script lang="ts">
	import { TextArea } from 'carbon-components-svelte';
  import { reportData } from '$lib/report-data';

  let value = ''
  let isInputing = false

  // user input change sms text
  $: if (isInputing) {
    reportData.update((old) => {
      return { ...old, smsText: value }
    })
  }

  reportData.subscribe((val) => {
    if (isInputing) return
    if (val.smsText === null) return
    if (val.smsText === value) return
    value = val.smsText
  })

  // change value based on other attribute's change
  $: if (!isInputing) {
    value = generateSMSText($reportData)
  }

  function generateSMSText(data) {
    let text = ''
    text += `地點：${data.address}`
    text += `\n違規情事：有${data.vehicles}在${data.situation}`
    if (data.plateNumbers) {
      text += `\n車牌號碼：${data.plateNumbers}`
    }
    if (data.imageURLs) {
      text += `\n照片連結：${data.imageURLs}`
    }
    text += '\n請派員處理'
    if (data.signature) {
      text += `\n\n${data.signature}`
    }

    return text
  }

</script>

<TextArea rows={6} on:blur={() => isInputing = false} on:focus={() => isInputing = true} labelText="簡訊" placeholder="..." bind:value />
