const router = require('express').Router();

router.post('/login',(req,res)=>{
    res.send('login sucess'); 
})

router.post('/signup',(req,res)=>{
    res.send('signup sucess'); 
})
module.exports = router;