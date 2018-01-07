const mongoose = require("mongoose");

const blogSchema =  new mongoose.Schema({

    title:String,
    image:String,
    body:String,
    created:{ type:Date, default:Date.now}


});

const Blog=mongoose.model("Blog", blogSchema);

module.exports=Blog;


// Blog.create({title:"image",image:" http://www.365hops.com/blog/wp-content/uploads/2015/05/Dhanaulti-Camping.jpg"});