async function commentHandler (event) {
    event.preventDefault();
    const post_id = document.querySelector('#art').dataset.postId;
    const content = document.querySelector('#comment-body').value.trim();


    if (content) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }

}



document.querySelector('.comment-form').addEventListener('submit', commentHandler);
