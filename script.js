const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const port = 80;
mongoose.connect('mongodb://localhost/iEducate',{useNewUrlParser: true});
 
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    concern: String
});

var contact = mongoose.model('iEducate',contactSchema);

app.use('/folder',express.static('folder'));
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.sendFile(path.join(__dirname,'index.html'));
    }).catch(()=>{
        res.status(404).send("ERROR")
    })
});

app.listen(port,()=>{
   console.log(`server started on port ${port}`);
})