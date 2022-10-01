const express = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const Clients = require("./clients.model");
const app = express.Router();


app.get("/",authMiddleware, async (req,res)=>{
    try{
        let client = await Clients.find({userId:req.userId});
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.get("/:id",authMiddleware, async (req,res)=>{
    try{
        let id = req.params;
        let client = await Clients.findById(id);
    res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
    
});

app.post("/",authMiddleware,async(req,res)=>{
    try{
        let client = await Clients.create({...req.body,userId:req.userId});
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})
app.patch("/:id",authMiddleware,async(req,res)=>{
    try{
        let id = req.params;
        let client = await Clients.findByIdAndUpdate({id},{$set:{...req.body}})
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})

app.delete("/:id",authMiddleware,async(req,res)=>{
    try{
        let id = req.params;
        let client = await Clients.findByIdAndDelete(id);
        res.send(client);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = app;