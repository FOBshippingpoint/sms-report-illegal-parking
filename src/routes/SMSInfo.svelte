<script lang="ts">
	import { Tile } from 'carbon-components-svelte';
	import { Row, Column } from 'carbon-components-svelte';
	import { reportData } from '$lib/report-data';
</script>

<Row>
	<Column noGutterRight>
		<Tile>{$reportData.policeDepartment}</Tile>
	</Column>
	<Column noGutterLeft>
		<Tile>{$reportData.phoneNumber}</Tile>
	</Column>
</Row>
