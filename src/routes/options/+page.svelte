<script lang='ts'>
	import { Grid, Row, Column } from 'carbon-components-svelte';
  import { TextArea } from "carbon-components-svelte";
  import { ExpandableTile } from "carbon-components-svelte";
  import { Theme } from "carbon-components-svelte";
  import { Button } from "carbon-components-svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import { commonlyUsed } from '$lib/commonly-used'
  import { reportData } from '$lib/report-data'


  let signature = ''

  $: reportData.update((old) => {
    return { ...old, signature }
  })

  reportData.subscribe((value) => {
    if (signature === value.signature) return
    signature = value.signature
  })

  function handleClick(commonlyUsedKey: string) {
    commonlyUsed.update((old) => {
      delete old[commonlyUsedKey]
      return old
    })
  }

  $: commonlyUsedArr = Object.keys($commonlyUsed).map((key) => {
    return { id: key, data: $commonlyUsed[key] }
  })
</script>


<svelte:head>
	<title>違停簡訊報案</title>
	<meta name="description" content="熊安全 違規停車簡訊報案工具" />
</svelte:head>

<Grid padding>
  {#if commonlyUsedArr.length > 0}
  <Row><Column>
    <ExpandableTile>
        <div slot="above">常用簡訊</div>
      <div slot="below" class="gap-container">
        <div></div>
        {#each commonlyUsedArr as data}
          <div>
            <Button kind='danger' icon={TrashCan} size='small' on:click={(e) => {
                    e.stopPropagation();
                    handleClick(data.id)
                    }} style="min-width: 100%">刪除 {data.id}</Button>
          </div>
        {/each} 
      </div>
    </ExpandableTile>
  </Column></Row>
  {/if}
  <Row><Column><TextArea labelText='簡訊模板' helperText='簽名檔將會附加在簡訊尾部' placeholder='...' bind:value={signature} /></Column></Row>
    <Row><Column><Theme render='select' select={{ themes: ['white', 'g10', 'g80', 'g90', 'g100'], labelText: '主題' }} /></Column></Row>
</Grid>

<style>
  .gap-container{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
