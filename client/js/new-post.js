
async function saveHandler(event) {
    event.preventDefault();
  console.log('SAVE POST BTN HIT');

    const postTitle = document.querySelector('#post-title').value;
    const postContent = document.querySelector('#post-content-textarea').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }


document.querySelector('#save-post-btn').addEventListener('click', saveHandler);

