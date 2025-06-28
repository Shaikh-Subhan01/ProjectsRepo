// Password matching fuction
function checkPasswords(event){
    event.preventDefault();
    const password = document.getElementById('pass').value;
    const passConfirm = document.getElementById('passConfirm').value;

    if(password !== passConfirm){
    document.getElementById('matchPass').innerText = "Passwords do not match";
        return false;
    }
    else{
        document.getElementById('matchPass').innerText = "";
        document.querySelector('form').submit();
        location.href = "index.html";
        return true;
    }
}

const toggleBtns = document.querySelectorAll('.togglePassword'); // Select all toggle buttons
const passwordToggle = document.querySelector('#pass'); // Select password input
const passConfirmToggle = document.querySelector('#passConfirm'); // Select confirm password input


// Toggle function for password fields
toggleBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        // If it's the first button (index 0), toggle the password input field
        if (index === 0) {
            const type = passwordToggle.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordToggle.setAttribute('type', type);
        } 
        // If it's the second button (index 1), toggle the confirm password input field
        else if (index === 1) {
            const type = passConfirmToggle.getAttribute('type') === 'password' ? 'text' : 'password';
            passConfirmToggle.setAttribute('type', type);
        }

        // Toggle the eye icon (bi-eye class) for the clicked button
        btn.classList.toggle('bi-eye');
        btn.classList.toggle('bi-eye-slash');
    });
});



