
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

document.querySelector('#new-post-btn').addEventListener('click', newPost);
