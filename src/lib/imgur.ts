import { PUBLIC_IMGUR_CLIENT_ID } from '$env/static/public';

const headers = { Authorization: `Client-ID ${PUBLIC_IMGUR_CLIENT_ID}` };

export async function uploadImage(img) {
	const formData = new FormData();
	formData.append('image', img);
	try {
		const response = await fetch('https://api.imgur.com/3/image', {
			method: 'POST',
			headers,
			body: formData
		});

		const { data, success, status } = await response.json();

		if (!success) {
			console.log('Upload failed with status', status);
			return;
		}

		return data.link;
	} catch (err) {
		console.log(err);
	}
}

export async function checkLimit() {
	try {
		const response = await fetch('https://api.imgur.com/3/credits', { headers });

		const { data, success, status } = await response.json();

		if (!success) {
			console.log('Error on checking Imgur credits');
			return;
		}

		return data.ClientRemaining;
	} catch (err) {
		console.log(err);
	}
}
