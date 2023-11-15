const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// In-memory user storage (for demonstration purposes)
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (userExists(username)) {
        return sendResponse(res, 'Username already exists', 409);
    }

    const hashedPassword = await hashPassword(password);
    users.push({ username, password: hashedPassword });

    sendResponse(res, 'Registration successful', 201);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = getUser(username);

    if (!user) {
        return sendResponse(res, 'Invalid username or password', 401);
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (passwordMatch) {
        sendResponse(res, 'Login successful');
    } else {
        sendResponse(res, 'Invalid username or password', 401);
    }
});

app.get('/secured', (req, res) => {
    // For simplicity, always allow access to the secured page
    sendResponse(res, 'This is a secured page');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

function sendResponse(res, message, statusCode = 200) {
    res.status(statusCode).send(message);
}

function userExists(username) {
    return users.some(user => user.username === username);
}

function getUser(username) {
    return users.find(user => user.username === username);
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function comparePasswords(inputPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}