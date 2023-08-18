const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs')

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login',(req,res,next)=>{
    res.send(`
    <form action="/product" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('user').value)">
      <input type="text" name="user" id="user">
      <button>Login</button>
    </form>
  `)
})
app.post('/product',(req,res,next)=>{
    res.redirect('/')
})

app.post('/',(req,res,next)=>{
    const username = req.body.username
    const message = req.body.message
    fs.writeFile('message.txt',`${username}:${message} `,{flag:'a'},(error)=>{
        if(error){
            console.log('error')
        }
        else{
            res.redirect('/')
        }
    })
})

app.get('/',(req,res,next)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            data = 'Nothing to Show'
            res.send(`
            <p>${data}</p>
    <form action="/" method="POST" onSubmit="document.getElementById('hidden').value = localStorage.getItem('username')">
    <input type="hidden" name="username" id="hidden" />
      <input type="text" name="message" />
      <button>Send</button>
    </form>
  `)
        }
    else{
            res.send(`
            <p>${data}</p>
    <form action="/" method="POST" onSubmit="document.getElementById('hidden').value = localStorage.getItem('username')">
    <input type="hidden" name="username" id="hidden" />
      <input type="text" name="message" />
      <button>Send</button>
    </form>
  `)
    }
   
    })
    
})

app.listen(8000)