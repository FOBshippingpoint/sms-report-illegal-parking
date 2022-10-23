<script lang="ts">
	import { MultiSelect } from 'carbon-components-svelte'
  import { reportData } from '$lib/report-data'

	const items = [
		{ id: '自行車', text: '自行車' },
		{ id: '機車', text: '機車' },
		{ id: '汽車', text: '汽車' },
		{ id: '大型車', text: '大型車' },
	]

	let selectedIds: string[] = []

  reportData.subscribe((value) => {
    if (value.vehicles === null) return
    if (value.vehicles === '車輛') {
      selectedIds = []
    } else {
      selectedIds = value.vehicles.split('、')
    }
  })

  $: reportData.update((old) => {
    const items_ = selectedIds.map((id) => items.find((item) => item.id === id))
    let vehicles = items_.map((item) => item.text).join('、')
    if (vehicles === '') {
      vehicles = '車輛'
    }
    return { ...old, vehicles }
  })

</script>

<MultiSelect titleText="違停車種" label="違停車輛種類" {items} bind:selectedIds />
