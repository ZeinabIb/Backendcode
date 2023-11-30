import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
{
    flight:{
        type: String,
        required : true,
    },
    roundtrip:{
        type: Boolean,
        required : true,
    },
    numOfAdults:{
        type: Number,
        required : true,
    },
    numOfChildren:{
        type: Number,
        required : true,
    },
    numpOfPets:{
        type: Number,
        required : true,
    },
},
{
  timestamps: true,
}

);
export const Ticket = mongoose.model('Ticket', ticketSchema)