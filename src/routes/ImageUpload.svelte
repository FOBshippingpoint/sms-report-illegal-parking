<script lang="ts">
	import { FileUploader } from 'carbon-components-svelte';
	import { uploadImage } from '$lib/imgur';
	import { reportData } from '$lib/report-data';
  
  type Image = {
    url: string;
    file: File;
  }
  
	let images: Image[] = [];
	let status = 'complete';

	$: if (images.length > 0) {
		reportData.update((old) => {
			const imageURLs = images.map((image) => image.url).join('、');
			return { ...old, imageURLs };
		});
	}

  function handleAdd(e) {
		const files = e.detail;
		let completed = 0;
		status = 'uploading';
		files.forEach(async (file) => {
			const url = await uploadImage(file);
			if (!url) {
				status = 'error';
				return;
			}
			const image = { file, url };
			images = [...images, image];
			completed++;
			if (completed === files.length) {
				status = 'edit';
			}
		});
	}

	function handleRemove(e) {
		const files = e.detail;
		for (const file of files) {
			const i = images.findIndex((image) => image.file === file);
			if (i !== -1) {
				images.splice(i, 1);
			}
		}
		images = images;
	}
</script>

<FileUploader
	multiple
	labelDescription="上傳照片"
	buttonLabel="選擇照片"
	kind="secondary"
	accept={['.jpg', '.jpeg', '.png']}
	{status}
	on:add={handleAdd}
	on:remove={handleRemove}
/>
