const mongoose =require("mongoose");

const projectSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    clientId:{type:mongoose.Schema.Types.ObjectId,ref:"client",required:true},
    name:{type:String,required:true},
    currency:{type:String},
    status:{type:Boolean},
    startDate:{type:String},
    
});

const projects = mongoose.model("project",projectSchema);

module.exports = projects;
