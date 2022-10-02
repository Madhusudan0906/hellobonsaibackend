const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const Projects = require("./projects.model");

const app = express.Router();


app.get("/",async (req,res)=>{
    try{
        let project = await Projects.find();
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.get("/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let project = await Projects.findById(id);
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.get("/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let project = await Projects.find(id);
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.post("/",async (req,res)=>{
    try{
        let project = await Projects.create({...req.body});
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
})
app.patch("/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let project = await Projects.findByIdAndUpdate({_id:id},{...req.body});
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
});
app.delete("/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let project = await Projects.findByIdAndDelete(id);
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = app;
