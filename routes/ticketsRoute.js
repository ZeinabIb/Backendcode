import express from 'express';
import { Ticket } from '../models/ticketModel.js';

const router = express.Router();

//Save a new ticket
router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.flight ||
            !request.body.roundtrip ||
            !request.body.numOfAdults ||
            !request.body.numOfChildren ||
            !request.body.numpOfPets 
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }

        const newTicket ={
            flight: request.body.flight,
            roundtrip: request.body.roundtrip ,
            numOfAdults: request.body.numOfAdults ,
            numOfChildren: request.body.numOfChildren ,
            numpOfPets: request.body.numpOfPets ,
         
        };
        const ticket = await Ticket.create(newTicket);
        return response.status(201).send(ticket)


    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//get all tickets
router.get('/', async (request,response)=>{
    try{
        const tickets = await Ticket.find({});
        return response.status(200).json({
            count: tickets.length,
            data: tickets
        })

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//get ticket by id
router.get('/:id', async (request,response)=>{
    try{
        const {id}= request.params;

        const ticket = await Ticket.findById(id);
        return response.status(200).json(ticket)

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
})
//update ticket
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.flight ||
            !request.body.roundtrip ||
            !request.body.numOfAdults ||
            !request.body.numOfChildren ||
            !request.body.numpOfPets 
        ){
        
          return   response.status(400).send({message:`send all requiered fields`})
        }
        const {id}= request.params;
        const result = await Ticket.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message:`ticket not found`})
        }
        return response.status(200).send({message:`ticket updated successfully`})



    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//delete ticket
router.delete('/:id',async(request,response)=>{
    try{
        const {id}= request.params
        const result = await Ticket.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:`Ticket not found`})
        }
        return response.status(200).send({message:`Ticket deleted successfully`})


    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

export default router