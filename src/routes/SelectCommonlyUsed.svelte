<script lang="ts">
  import { Dropdown } from "carbon-components-svelte";
  import { reportData } from "$lib/report-data"
  import { commonlyUsed } from "$lib/commonly-used"

  export let selectedCommonlyUsed

  let items = [{ id: '0', text: '無' }]
  let selectedId = '0'

  $: commonlyUsedKeys = Object.keys($commonlyUsed)

  $: if (commonlyUsedKeys.length > 0) {
    const commonlyUsedItems = commonlyUsedKeys.map((key) => { return { id: key, text: key } })
    items = [{ id: '0', text: '無' }, ...commonlyUsedItems]
  }

  $: if ($commonlyUsed[selectedId]) {
    reportData.set($commonlyUsed[selectedId])
    selectedCommonlyUsed = $commonlyUsed[selectedId]
  }
</script>


{#if items.length > 0}
  <Dropdown
    titleText="常用簡訊"
    bind:selectedId
    {items}
  />
{/if}
