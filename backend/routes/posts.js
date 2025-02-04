const express = require('express');

const router = express.Router();
const Post =require('../models/Post');
const Category =require('../models/Category');
//get all
router.get('/',async(req,res) =>{
    try{

        const posts= await Post.find();
        res.json(posts);

    } catch(error){
res.status(500).json({message:error.message})
    }
})
//get particular one based on id
router.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
const post=await Post.findById(id)
if(!post){
   return res.status(404).json({message:"Post not found"});
}
res.json(post);
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})

//crete a new post
router.post('/',async(req,res) =>{
    const post =new Post({
        title:req.body.title,
        content:req.body.content,
        catagory:req.body.catagory,
        author:req.body.author,
        image:req.body.image,
    });
    try{
const newPost =await post.save();
res.status(200).json(newPost);
    }
    catch(error){
res.status(400).json({message:error.message})
    } 
})
//update
router.put('/:id',async(req,res) =>{
    try{
        const id=req.params.id;
        const post=await Post.findById(id)
        if(!post){
          return  res.status(404).json({message:"Post not found"});
        }
        post.title=req.body.title || post.title;
        post.content=req.body.content|| post.content;
        post.catagory=req.body.catagory || post.catagory;
        post.author=req.body.author || post.author;
        post.image=req.body.image || post.image;
        post.updatedAt =Date.now();
        const updatedPost =await post.save();
        res.json(updatedPost);

    }
    catch(err){
res.status(400).json({message:err.message});
    }
})


//delete
router.delete('/:id',async(req,res) =>{
    try{
        const id=req.params.id;
        const post=await Post.findById(id)
        if(!post){
          return  res.status(404).json({message:"Post not found"});
        }
        await Post.findByIdAndDelete(id)
        res.json({message:"Post deleted"});
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.get('/category/:categoryId', async(req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Validate Category ID
        const categoryExists = await Category.findById(categoryId);
        if(!categoryExists) {
            res.status(400).json({message: 'Invalid Category ID'})
        }

        // Fetch posts
       const posts = await Post.find({category:categoryId}).populate('category');
       res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
