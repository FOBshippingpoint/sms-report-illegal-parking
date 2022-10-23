<script>
	import SMSInfo from './SMSInfo.svelte';
	import SMSEditor from './SMSEditor.svelte';
	import Address from './Address.svelte';
	import Vehicle from './Vehicle.svelte';
	import Situation from './Situation.svelte';
	import Plate from './Plate.svelte';
	import ImageUpload from './ImageUpload.svelte';
	import CommonlyUsed from './CommonlyUsed.svelte';
	import SelectCommonlyUsed from './SelectCommonlyUsed.svelte';
  import { Button } from 'carbon-components-svelte';
	import { Grid, Row, Column } from 'carbon-components-svelte';
  import SendFilled from "carbon-icons-svelte/lib/SendFilled.svelte";
  import { InlineNotification } from "carbon-components-svelte";
  import { reportData } from "$lib/report-data";

  let errorInfo = ''
  let disabledSend = true

  function handleSend() {
    const body = $reportData.smsText ? encodeURIComponent($reportData.smsText): ''
    const smsHyperLink = `sms:${$reportData.phoneNumber}?body=${body}`
    window.open(smsHyperLink)
  }

  // 錯誤檢查
  $: if ($reportData.smsText === '') {
    errorInfo = '簡訊不可為空'
    disabledSend = true
  } else if (!$reportData.phoneNumber) {
    errorInfo = '地址無法對應至號碼'
    disabledSend = true
  } else if (!$reportData.vehicles) {
    errorInfo = '請填寫違規車種'
    disabledSend = true
  } else {
    disabledSend = false
  }

</script>


<svelte:head>
	<title>違停簡訊報案</title>
	<meta name="description" content="熊安全 違規停車簡訊報案工具" />
</svelte:head>

<Grid padding>
  <Row><Column><SelectCommonlyUsed /></Column></Row>
  <SMSInfo />
  <Row><Column><SMSEditor /></Column></Row>
  <Address />
  <Row><Column><Vehicle /></Column></Row>
  <Row><Column><Situation /></Column></Row>
  <Row><Column><Plate /></Column></Row>
  <Row><Column><ImageUpload /></Column></Row>
  <Row><Column>
    <Button style="min-width: 100%" size="lg" icon={SendFilled} on:click={handleSend} disabled={disabledSend} >送出簡訊</Button>
      {#if disabledSend}
      <InlineNotification hideCloseButton kind="warning" title="警告：" subtitle={errorInfo} />
      {/if}
  </Column></Row>
  <Row><Column><CommonlyUsed /></Column></Row>
</Grid>
