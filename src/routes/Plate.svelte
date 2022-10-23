<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
  import { reportData } from '$lib/report-data'

  let value = ''

  // initialize report data from localstorage
  reportData.subscribe((val) => {
    if (val.plateNumbers === null) return
    value = val.plateNumbers.split('、').join(' ')
  })

  $: reportData.update((old) => {
    return { ...old, plateNumbers: value.split(' ').join('、') }
  })

</script>

<TextInput labelText='車牌號碼' placeholder='多面車牌請以空格分隔' bind:value />
