import { PUBLIC_IMGUR_CLIENT_ID } from "$env/static/public"

export async function uploadImage(img) {
  const formData = new FormData()
  formData.append('image', img)
  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${PUBLIC_IMGUR_CLIENT_ID}`
      },
      body: formData
    })

    const { data, success, status } = await response.json()

    if (!success) {
      console.log('Upload failed with status', status)
      return
    }

    return data.link
  } catch (err) {
    console.log(err)
  }
}
