// Client-side form validation
document.getElementById('userForm').addEventListener('submit', function (event) {
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value;
  const hCaptchaResponse = document.querySelector('textarea[name="h-captcha-response"]').value;
  const error = document.getElementById('error');

  if (!name || isNaN(age) || age <= 0 || !hCaptchaResponse) {
    event.preventDefault();
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
  }
});