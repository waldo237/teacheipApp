const express = require('express');
const RateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const PORT = process.env.PORT || 8080;
const app = express(); 

// helmet setup
app.use(helmet());

// rate limit setup
const limiter = new RateLimit({
        windowMs: 15*60*1000,
        max:300,
        delayMs:0
    });
    
app.use(cookieParser());
app.use(express.static(__dirname + "/dist/"));

app.get(/.*/,  limiter, function(req, res){
    res.sendFile((__dirname + "/dist/index.html"));
});

app.listen(PORT, () =>
    console.log(`your server is running on PORT ${PORT}`)
);