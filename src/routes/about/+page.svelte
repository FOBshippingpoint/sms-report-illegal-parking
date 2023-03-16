<script>
	import { UnorderedList, ListItem } from 'carbon-components-svelte';
	import { Grid, Row, Column } from 'carbon-components-svelte';
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
			<p>
				此網站是受<a href="https://police-remoter.netlify.app/">遙控報案大師</a
				>啟發而誕生的克隆版，加了一些功能：
			</p>
		</Column>
	</Row>
	<Row>
		<Column>
			<UnorderedList>
				<ListItem>使用 Google Geocoding API，應該比 OpenStreetMap 的地址更準確</ListItem>
				<ListItem>隨時自動儲存簡訊進度至 local storage (瀏覽器內建的儲存空間)</ListItem>
				<ListItem>可為熱點儲存常用簡訊供重複使用</ListItem>
				<ListItem>可自訂結尾簽名檔</ListItem>
			</UnorderedList>
		</Column>
	</Row>
	<Row noGutter>
		<Column>
			<a href="https://forms.gle/MksKdBtej4wkeXeR9">意見回饋</a>
		</Column>
		<Column>
			<a href="https://github.com/FOBshippingpoint/sms-report-illegal-parking">開源程式碼</a>
		</Column>
	</Row>
</Grid>
