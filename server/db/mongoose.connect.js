import mongoose from 'mongoose'

export default async function connectDB(){
    try{ 
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB", connection.connections[0].name)
    } catch (error){
        console.log(error)
    }
}