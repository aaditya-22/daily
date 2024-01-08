const express = require("express")
const jwt = require("jsonwebtoken")
const jwtPassword = "12345" 

const app = express()
app.use(express.json())

var ALLUSERS = [
    {
        username : "aditya@gamil.com",
        password : "qwweq",
        name : "aditya swami",
    },
    {
        username : "monu@gamil.com",
        password : "qaaeq",
        name : "monu tommy",
    },
    {
        username : "s1mple@gamil.com",
        password : "q23q",
        name : "s1mple kolostav",
    },
]

function userLives(username, password) {
    let userLives = false;
    for(let i=0; i<ALLUSERS.length; i++) {
        if(ALLUSERS[i].username == username && ALLUSERS[i].password == password) {
            userLives = true;
        }
    }
    return userLives;
}

app.get("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!userLives(username, password)) {
        return res.status(403).json({
            msg : "Invalid user"
        })
    }

    var token = jwt.sign({username : username}, jwtPassword)
    return res.json({
        token
    })
})

app.post("/users", (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token , jwtPassword)
    const username = decoded.username;

    res.json({
        users : ALLUSERS.filter(function(value) {
            if(value.username == username) {
                return false;
            }
            else{
                return true;
            }
        })
    })
})

app.listen(3000);