<script>
  import { UnorderedList, ListItem } from "carbon-components-svelte";
  import { Grid, Row, Column } from "carbon-components-svelte";
</script>

<svelte:head>
	<title>關於違停簡訊報案助手</title>
	<meta name="description" content="關於違停簡訊報案助手" />
</svelte:head>

<Grid padding>
  <Row>
    <Column>
      <h2>關於這個網站</h2>
    </Column>
  </Row>
  <Row noGutter>
    <Column>
      <p><a href='https://police-remoter.netlify.app/'>遙控報案大師</a>的克隆版，特色：</p>
    </Column>
  </Row>
  <Row>
    <Column>
  <UnorderedList>
    <ListItem>使用Google Geocoding API</ListItem>
    <ListItem>隨時儲存簡訊進度至local storage</ListItem>
    <ListItem>可為熱點儲存常用簡訊供重複使用</ListItem>
    <ListItem>可自訂結尾簽名檔</ListItem>
  </UnorderedList>
    </Column>
  </Row>
</Grid>
