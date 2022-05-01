
async function newPost(event) {
  event.preventDefault();
  console.log(event.target.id);

  const signIn = document.querySelector('#sign-in-div');
  const signUp = document.querySelector('#sign-up-div');
  const signInBtn = document.querySelector('#sign-in-btn');
  const signUpBtn = document.querySelector('#sign-up-btn');

  if (event.target.id === "sign-in-btn") {
    signIn.style.display = "flex";

  } else if (event.target.id === "sign-up-btn") {
    signUp.style.display = "flex";

  }
  signInBtn.style.display = "none";
  signUpBtn.style.display = "none";
}


async function saveHandler(event) {
  event.preventDefault();
  console.log('SAVE POST BTN HIT');

  const post_id = document.querySelector('#art').dataset.postId;
  const postTitle = document.querySelector('#post-title').value;
  const postContent = document.querySelector('#post-content').value;

  console.log(post_id, ' ----', postTitle, ' ------ ', postContent);

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
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



async function deleteHandler(event) {
  event.preventDefault();
  console.log('DELETE POST BTN HIT');

  const post_id = document.querySelector('#art').dataset.postId;

  console.log(post_id);

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}


document.querySelector('#delete-post-btn').addEventListener('click', deleteHandler);

document.querySelector('#save-post-btn').addEventListener('click', saveHandler);

document.querySelector('#new-post-btn').addEventListener('click', newPost);
