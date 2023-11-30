import mongoose from "mongoose";

const flightSchema = mongoose.Schema(
{
    departureLocation:{
        type: String,
        required : true,
    },
    destinaton:{
        type: String,
        required : true,
    },
    departureDate:{
        type: String,
        required : true,
    },
},
{
  timestamps: true,
}

);
export const Flight = mongoose.model('Flight', flightSchema)