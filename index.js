const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const { error } = require('console');
require('dotenv').config()
const app = express();
const port = 3010;
app.use(express.static('static'));
const User = require('./schema');
app.use(express.json())

mongoose.connect(process.env.mongodb)
.then((res)=>{
   console.log("Connected")
})
.catch((error)=>{
  console.log(error)
});






app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/api/users',async(req,res)=>{
  try {
    let user=new User(req.body)
    await user.save()
    
    res.status(200).json("user created")
  } catch (error) {
    if(error.name=="ValidationError"){
      return res.status(400).json("mongodb validation failed check your key names")
    }
    res.status(500).json({msg:error.message})
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

