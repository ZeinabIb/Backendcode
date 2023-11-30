import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

//Save a new user
router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.email ||
            !request.body.password ||
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.birthDate
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }

        const newUser ={
            email: request.body.email,
            password: request.body.password ,
            firstName: request.body.firstName ,
            lastName: request.body.lastName ,
            birthDate: request.body.birthDate,
        };
        const user = await User.create(newUser);
        return response.status(201).send(user)


    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//get all users
router.get('/', async (request,response)=>{
    try{
        const users = await User.find({});
        return response.status(200).json({
            count: users.length,
            data: users
        })

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//get user by id
router.get('/:id', async (request,response)=>{
    try{
        const {id}= request.params;

        const user = await User.findById(id);
        return response.status(200).json(user)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//update user
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.email ||
            !request.body.password ||
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.birthDate
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }
        const {id}= request.params;
        const result = await User.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message:`user not found`})
        }
        return response.status(200).send({message:`user updated successfully`})



    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//delete user
router.delete('/:id',async(request,response)=>{
    try{
        const {id}= request.params
        const result = await User.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:`user not found`})
        }
        return response.status(200).send({message:`user deleted successfully`})


    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

export default router