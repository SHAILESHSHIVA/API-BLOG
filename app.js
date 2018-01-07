const express   = require("express"),
      mongoose  = require("mongoose"),
      bodyPrser = require("body-parser"),
      Blog      = require("./models/blog"),
      override  = require("method-override")
      
mongoose.connect("mongodb://localhost/bog_app");

const app=express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyPrser.urlencoded({extended:true}));
app.use(override("_method"));

app.get("/", (req,res)=>{
    res.redirect("/blogs");
});

app.get("/blogs",(req,res)=>{
   Blog.find({}, (err,blogs)=>{
       if(err){
           console.log(err);
       }else{
           res.render("index",{blogs:blogs});
       }
   });
});

//new route

app.get("/blogs/new", (req,res)=>{
    res.render("new");
});

//create route

app.post("/blogs", (req,res)=>{
    Blog.create(req.body.blog, (err,newBlog)=>{
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    })
});
 

app.get("/blogs/:id", (req,res)=>{
    Blog.findById(req.params.id, (err,found)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:found});
        }
    });
});


//edit route

app.get("/blogs/:id/edit", (req,res)=>{
    Blog.findById(req.params.id, (err,editBlog)=>{
        if(err){
            res.redirect("/blogs")
        }else{

            res.render("edit",{blog:editBlog});
        }
    })

});    


//update route

app.put("/blogs/:id",(req,res)=>{
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err,updated)=>{
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/"+ req.params.id);
       }
   })
});

//delete route

app.delete("/blogs/:id", (req,res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
  if(err){
      res.redirect("/blogs");
  }else{
      res.redirect("blogs");
  }
    })
});

app.listen(process.env.PORT || 4000, ()=>{console.log("server running")});

