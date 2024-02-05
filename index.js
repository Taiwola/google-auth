const path = require('path');
const express = require("express");
const passport = require("passport");
require("./auth")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, 'Client')))

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/auth/google/success', (req, res) => {
    const name = req.user.displayName;
    res.status(200).json({
        message: "success",
        name
    });
});

app.get('/auth/google/failure', (req, res) => {
    res.status(200).json({
        message: "failed"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
