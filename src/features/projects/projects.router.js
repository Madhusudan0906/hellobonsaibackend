const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const Projects = require("./projects.model");

const app = express.Router();


app.get("/",authMiddleware,async (req,res)=>{
    try{
        let project = await Projects.find();
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
    
});
app.post("/",authMiddleware,async (req,res)=>{
    try{
        let project = await Projects.create({...req.body});
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
})
app.patch("/:id",authMiddleware,async (req,res)=>{
    try{
        let id = req.params;
        let project = await Projects.findByIdAndUpdate({id},{...req.body});
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
});
app.delete("/:id",authMiddleware,async (req,res)=>{
    try{
        let id = req.params;
        let project = await Projects.findByIdAndDelete({id});
        res.send(project);
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = app;