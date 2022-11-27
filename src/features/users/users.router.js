const express = require('express');
const users = require("./users.model");
const companys = require("./company.model");
const authMiddleware =require("../middlewares/auth.middleware");

const app = express.Router();



app.get("/", async (req,res)=>{
    let user = await users.find();
    res.send(user);
})
app.get("/:id", async (req,res)=>{
    try{
        let id = req.params.id;
        
    let user = await users.findById(id);
    // console.log(user);
    let company = await companys.find({userId:user.id});
    // console.log(company);
    let item={user:user,company:company};
    res.send(item);
    // res.send(d);
    }catch(e){
        res.status(500).send(e);
    }
    
})
app.patch("/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let user = await users.findOneAndUpdate({_id:id},{...req.body})

        res.send(user);

    }
    catch(e){
        res.status(500).send(e);
    }
})
app.post("/signUp",async (req,res)=>{
    let {email} = req.body;
    try{
        let user = await users.findOne({email});
        if(user){
            return res.status(404).send("user Already Exists.");
        }else{
            let newUser = await users.create(req.body);
            await companys.create({userId:newUser.id});
            console.log(typeof(newUser.id),newUser.id);
            return res.send({
                token:`${newUser.id}:${newUser.email}`
            });
        }
    }catch(e){
        res.status(500).send(e.message);
    }

})
app.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    try{
        let user = await users.findOne({email,password});

        if(!user){
            return res.status(401).send("Authentication error");
        }
        res.set({
            token:`${user.id}:${user.email}`
        });
        res.cookie("token",`${user.id}:${user.email}`,{
            expires: new Date(Date.now() + (30 * 60000)) , httpOnly: true
        });
        
        res.send({
            token:`${user.id}:${user.email}`
        });
        
    }catch(e){
        res.status(500).send(e.message);
    }
})
app.post("/company",async (req,res)=>{
    let token = req.headers.cookie;
        let a = token.split("=");
      let tokena= a[1].split("%3A");
      let id = tokena[0];
      let email = tokena[1].split("%40");
      email = email.join("@");
    try{
        let company = await companys.find({userId:id});
        console.log(company);
        if(company){
            let {name,contact,address} = req.body;
            if(name){
               await companys.updateOne({userId:id},{$set:{name:name}});
            }
            if(contact){
               await companys.updateOne({userId:id},{$set:{contact:contact}});
            }
            if(address){
               await companys.updateOne({userId:id},{$set:{address:address}});
            }
            res.send("update successfully");
        }else{
            
               item= await companys.create({userId:id,...req.body});
            
            res.send(item);
        }
    }catch(e){
        res.status(500).send(e);
    }
})
app.post("/logout",(req,res)=>{
    try{
        res.clearCookie('token');
        res.send("logout successfully");
    }catch(e){
        res.status(500).send(e);
    }
    
})
module.exports = app;