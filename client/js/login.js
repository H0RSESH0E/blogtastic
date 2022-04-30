async function loginHandler(event) {
  event.preventDefault();
console.log('loginHandler running...');
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert('hello!! ---- ', response.statusText);
    }
  }
}

async function signupHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

async function signInOrUp(event) {
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

document.querySelector('.login-form').addEventListener('submit', loginHandler);

document.querySelector('.signup-form').addEventListener('submit', signupHandler);

document.querySelector('#sign-in-up').addEventListener('click', signInOrUp);

