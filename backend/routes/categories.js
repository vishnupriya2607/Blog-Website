const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { models } = require('mongoose');

router.get('/',async(req,res) =>{
    try{
        const categories=await Category.find();
        res.json(categories)
    }
    catch(err)
    {
res.status(500).json({message:error.message})
    }
}) 
router.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
const category=await Category.findById(id)
if(!category){
   return res.status(404).json({message:"category not found"});
}
res.json(category);
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})


//crete a new post
router.post('/',async(req,res) =>{
    const category =new Category({
        name:req.body.name,
        slug:req.body.slug,
        description:req.body.description
    });
    try{
const newPost =await category.save();
res.status(200).json(newPost);
    }
    catch(error){
res.status(400).json({message:error.message})
    } 
})


router.put('/:id',async(req,res) =>{
    try{
        const category=await Category.findById(req.params.id)
        if(!category){
          return  res.status(404).json({message:"category not found"});
        }
        category.name=req.body.name||category.name;
        category.slug=req.body.slug||category.slug;
     category.description=req.body.description||category.description;
       
        category.updatedAt =Date.now();
        const updatedCategory =await category.save();
        res.json(updatedCategory);

    }
    catch(err){
res.status(400).json({message:err.message});
    }
})
router.delete('/:id',async(req,res) =>{
    try{
        const id=req.params.id;
        const category=await Category.findById(id)
        if(!category){
          return  res.status(404).json({message:"category not found"});
        }
        await Category.findByIdAndDelete(id)
        res.json({message:"Category deleted"});
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

module.exports =router;