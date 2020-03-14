const express = require('express');
const jwt = require('jsonwebtoken');
const app= express();

app.get('/api', (req,res)=>{
    res.json({
        Message:'Welcome to jwt'
    });
});

app.post('/api/post',verifyToken, (req, res) =>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:'post create...',
                authData
            });
        }
    })
});


app.post('/api/login',(req,res)=>{
const user={
    _id:1,
    name:'bran',
    email:'bran@gmail.com'
}
jwt.sign({user},'secretkey',{expiresIn: '60s'}, (err, token) =>
{
res.json({
    token
});
});
});


function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader= req.headers['authorization'];
    //check bearer
    if(typeof bearerHeader !== 'undefined'){
        console.log("bearer",bearerHeader)
        //split the space
    const bearer = bearerHeader.split(' ');
    //get token from the array
    const bearerToken= bearer[1];
    //set the token
    req.token= bearerToken;
    //next middleware
    next()
    }else{
        res.sendStatus(403);
    }
    }
app.listen(5000, ()=>console.log('server started at port 5000'));
