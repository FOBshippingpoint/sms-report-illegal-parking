<script lang="ts">
	import { Dropdown } from 'carbon-components-svelte';
  import { reportData } from '$lib/report-data'

	const items = [
		{ id: '紅線停車', text: '紅線停車' },
		{ id: '人行道上停車', text: '人行道上停車' },
		{ id: '行人穿越道上停停車', text: '行人穿越道上停停車' },
		{ id: '公車停車格停車', text: '公車停車格停車' },
		{ id: '路口停車', text: '路口停車' },
		{ id: '併排停車', text: '併排停車' }
	];

  let selectedId = items[0].id

  reportData.subscribe((value) => {
    if (value.situation === null) return
    selectedId = value.situation
  })

  $: reportData.update((old) => {
    return { ...old, situation: selectedId }
  })

</script>

<Dropdown titleText="違規樣態" bind:selectedId {items} />
