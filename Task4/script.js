// DOM elements
const greetingElement = document.getElementById('greeting');
const buttonContainer = document.getElementById('buttonContainer');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const messageElement = document.getElementById('message');

// Event listeners
document.getElementById('registerToggle').addEventListener('click', () => toggleForm('registerForm'));
document.getElementById('loginToggle').addEventListener('click', () => toggleForm('loginForm'));

// Functions
function toggleForm(formId) {
    const forms = [registerForm, loginForm];
    forms.forEach(form => form.style.display = form.id === formId ? 'block' : 'none');
    clearMessage();
}

function clearMessage() {
    messageElement.innerText = '';
    messageElement.classList.remove('error');
}

function showMessage(message, isError) {
    messageElement.innerText = message;
    messageElement.className = isError ? 'error' : '';
}

// Registration logic
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!validateInput(username, password)) {
        return;
    }

    if (userExists(username)) {
        showMessage('Username already exists', true);
        return;
    }

    const hashedPassword = hashPassword(password);
    // In a real-world app, send the registration data to the server here

    showMessage('Registration successful', false);
}

function userExists(username) {
    return users.some(user => user.username === username);
}

// Login logic
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!validateInput(username, password)) {
        return;
    }

    const user = getUser(username);

    if (!user) {
        showMessage('Invalid username or password', true);
        return;
    }

    const passwordMatch = comparePasswords(password, user.password);

    if (passwordMatch) {
        showMessage('Login successful', false);
        // In a real-world app, perform actions for logged-in users
    } else {
        showMessage('Invalid username or password', true);
    }
}

function getUser(username) {
    return users.find(user => user.username === username);
}

function validateInput(username, password) {
    if (username.trim() === '' || password.trim() === '') {
        showMessage('Please enter both username and password.', true);
        return false;
    }
    return true;
}

// Password handling (replace with more secure methods in a real-world scenario)
function hashPassword(password) {
    return password.split('').reverse().join('');
}

function comparePasswords(inputPassword, hashedPassword) {
    return inputPassword === hashedPassword.split('').reverse().join('');
}