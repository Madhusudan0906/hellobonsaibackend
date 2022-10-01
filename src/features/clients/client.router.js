const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const Clients = require("./clients.model");
const app = express.Router();


app.get("/", async (req,res)=>{
    try{
        let token = req.headers.cookie;
        let a = token.split("=");
      let tokena= a[1].split("%3A");
      let id = tokena[0];
      let email = tokena[1].split("%40");
      email = email.join("@");
        let client = await Clients.find({userId:id});
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.get("/:id", async (req,res)=>{
    try{
    //     let token = req.headers.cookie;
    //     let a = token.split("=");
    //   let tokena= a[1].split("%3A");
    //   let id = tokena[0];
    //   let email = tokena[1].split("%40");
    //   email = email.join("@");
        let id = req.params;
        let client = await Clients.findById(id);
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});

app.post("/",async(req,res)=>{
    try{
        let token = req.headers.cookie;
        let a = token.split("=");
      let tokena= a[1].split("%3A");
      let id = tokena[0];
      let email = tokena[1].split("%40");
      email = email.join("@");
        let client = await Clients.create({...req.body,userId:id});
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})
app.patch("/:id",async(req,res)=>{
    try{

        let id = req.params;
        let client = await Clients.findByIdAndUpdate({id},{$set:{...req.body}})
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})

app.delete("/:id",async(req,res)=>{
    try{
        let id = req.params;
        let client = await Clients.findByIdAndDelete(id);
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = app;