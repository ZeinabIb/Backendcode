import express from 'express';
import { Flight } from '../models/flightModel.js';

const router = express.Router();

//Save a new flight
router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.departureLocation ||
            !request.body.destinaton ||
            !request.body.departureDate 
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }

        const newFlight ={
            departureLocation: request.body.departureLocation,
            destinaton: request.body.destinaton ,
            departureDate: request.body.departureDate ,
         
        };
        const flight = await Flight.create(newFlight);
        return response.status(201).send(flight)


    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//get all flights
router.get('/', async (request,response)=>{
    try{
        const flights = await Flight.find({});
        return response.status(200).json({
            count: flights.length,
            data: flights
        })

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//get flight by id
router.get('/:id', async (request,response)=>{
    try{
        const {id}= request.params;

        const flight = await Flight.findById(id);
        return response.status(200).json(flight)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//update flight
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.departureLocation ||
            !request.body.destinaton ||
            !request.body.departureDate 
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }
        const {id}= request.params;
        const result = await Flight.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message:`flight not found`})
        }
        return response.status(200).send({message:`flight updated successfully`})



    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//delete flight
router.delete('/:id',async(request,response)=>{
    try{
        const {id}= request.params
        const result = await Flight.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:`Flight not found`})
        }
        return response.status(200).send({message:`Flight deleted successfully`})


    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

export default router