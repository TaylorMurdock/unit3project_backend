///////////////////////////////////////////////////////////// import our dependecies:
require("dotenv").config();
const {PORT = 8000, MONGODB_URL} = process.env
// import express:
const express = require('express')
// create application object:
const app = express()
// import mongoose:
const mongoose= require("mongoose")
// import cors"
const cors = require("cors")
//import morgan:
const morgan = require("morgan")

//////////////////////////////////////////////////////////////////Database connection 
mongoose.connect(MONGODB_URL)

//////////////////////////////////////////////////////////////////connectionEvent:
mongoose.connection
.on("open", ()=>console.log("conected to Mongooes"))
.on("close", ()=>console.log("Disconected to Mongooes"))
.on("error", (error)=>console.log(error))

//////////////////////////////////////////////////////////////////MODELS
const recipeSchema = new mongoose.Schema({
    name:String,
    image:String,
    ingredients:String,
    instructions:String,
    prepTime:String,
    cookingTime:String,
    author:String,
    star: String})
const Recipe = mongoose.model("Recipe", recipeSchema)

//////////////////////////////////////////////////////////////////MIDDLEWARE:
// use cors:
app.use(cors())
// use morgan:
app.use(morgan("dev"))
// express functionality to recognize incoming request object as JSON objects:
app.use(express.json())
/////////////////////////////////////////////////////////////////ROUTES 

// INDEX: get:
app.get("/", async(req, res)=>{
    try{
        const recipies = await Recipe.find({})
        res.json (recipies)
    }
    catch(error){
        res.status(400).json({error})
    }
})
// CREATE ROUTE: POST: "/""
app.post("/", async (req,res)=>{
    try{
        // create recipe:
        const recipe = await Recipe.create(req.body)
        // send created recipe:
        res.json(recipe)
    }
    catch(error){
        res.status(400).json({error})
    }
})
//SHOW ROUTE: GET: "/"
app.get("/:id", async(req, res)=>{
    try{
        id = req.params.id
        // get a Recipe from DataBase
        const recipe = await Recipe.findById(id)
        // return a recipe as Json
        res.json(recipe)
    }
    catch(error){
        res.status(400).json({error})
    }
})

//Update Route: PUT: "/:id:
app.put("/:id", async (req, res)=>{
    try{
        // update the person
        const recipe= await Recipe.findByIdAndUpdate(req.params.id, req.body,{new: true})
        // send the updated recipe as json
        res.json(recipe)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// DESTROY-> DELETE - /:id - delete a Individual Recipe:
app.delete("/:id", async (req, res)=>{
    try{
        const recipe = await Recipe.findByIdAndDelete(req.params.id)
        // send deleted recipe as Json
        res.status(400).json(recipe)
    }
    catch(error){
        res.status(204).json({error})
    }
})



//////////////////////////////////////////////////////////////// Server PORT:
app.listen(PORT, ()=>{
    console.log(`lsitenting to port ${PORT}`);
})