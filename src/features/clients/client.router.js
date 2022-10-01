const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const Clients = require("./clients.model");
const app = express.Router();


app.post("/", async (req,res)=>{
    try{
        
        let client = await Clients.find({userId:req.body.userId});
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.get("/:id", async (req,res)=>{
    try{
        let id = req.params;
        let client = await Clients.findById(id);
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});

app.post("/",async(req,res)=>{
    try{
        
        let client = await Clients.create({...req.body});
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