const express = require('express');
const RateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const app = express(); 

// rate limit setup
const limiter = new RateLimit(
    {
        windowMs: 15*60*1000,
        max:300,
        delayMs:0
    }
)
app.use(express.static(__dirname+ "/dist/"));
app.use(cookieParser());
app.get(/.*/,  limiter, function(req, res){
    res.sendFile((__dirname+ "/dist/index.html"));
});
app.listen(port);
console.log("Server started...");

