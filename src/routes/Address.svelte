<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
	import { Button } from 'carbon-components-svelte';
	import { TextInputSkeleton } from 'carbon-components-svelte';
	import LocationFilled from 'carbon-icons-svelte/lib/LocationFilled.svelte';
	import { onMount } from 'svelte';
	import { Row, Column } from 'carbon-components-svelte';
	import { reportData } from '$lib/report-data';

	const phoneNumbersMap = {
		臺北市政府警察局: '0911510915',
		新北市政府警察局: '0911510105',
		桃園市政府警察局: '0917110880',
		臺中市政府警察局: '0911510915',
		臺南市政府警察局: '0911510916',
		高雄市政府警察局: '0911510917',
		基隆市警察局: '0911510918',
		新竹市警察局: '0911510919',
		嘉義市政府警察局: '0911510920',
		新竹縣政府警察局: '0911510921',
		苗栗縣警察局: '0911510922',
		彰化縣警察局: '0911510933',
		南投縣政府警察局: '0911510923',
		雲林縣警察局: '0911510924',
		嘉義縣警察局: '0911510925',
		屏東縣政府警察局: '0911510926',
		宜蘭縣政府警察局: '0911510927',
		花蓮縣警察局: '0911510928',
		臺東縣警察局: '0911510929',
		澎湖縣政府警察局: '0911510930',
		金門縣警察局: '0911510931',
		連江縣警察局: '0911510932'
	};

	let value = '';
	let policeDepartment = '';
	let phoneNumber = '';

	let disabled = false;

	$: text = disabled ? '請稍候' : '定位　';

	onMount(() => {
		if ($reportData.address) return;
		locating();
	});

	function locating() {
		if (!navigator.geolocation) {
			alert('Your browser does not support geolocation');
			return;
		}

		disabled = true;
		navigator.geolocation.getCurrentPosition(async (position) => {
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;

			let address = await getAddress(lat, lng);
			address = address.replace('台', '臺');
			value = address.replace(/^.*臺灣/, '');
			disabled = false;
		});
	}

	async function getAddress(lat: number, lng: number) {
		const response = await fetch(`/api/address?latlng=${lat},${lng}`);

		const { addresses } = await response.json();

		return addresses[0];
	}

	function getSMSInfo(address: string) {
		let addr = address.replace('台', '臺');

		for (const [key, value] of Object.entries(phoneNumbersMap)) {
			// get 縣市名稱 (前兩個字)
			const administrativeArea = key.substring(0, 2);
			if (addr.includes(administrativeArea)) {
				return {
					policeDepartment: key,
					phoneNumber: value
				};
			}
		}
	}

	$: {
		const smsInfo = getSMSInfo(value);
		if (smsInfo) {
			policeDepartment = smsInfo.policeDepartment;
			phoneNumber = smsInfo.phoneNumber;
		}
	}

	$: reportData.update((old) => {
		return { ...old, address: value, policeDepartment, phoneNumber };
	});

	reportData.subscribe((val) => {
		if (val.address === null) return;
		value = val.address;
	});
</script>

<Row>
	<Column lg={11}>
		{#if !disabled}
			<TextInput placeholder="輸入地址..." bind:value />
		{:else}
			<TextInputSkeleton hideLabel />
		{/if}
	</Column>
	<Column lg={5}>
		<Button kind="secondary" size="field" icon={LocationFilled} on:click={locating} {disabled}
			>{text}</Button
		>
	</Column>
</Row>
